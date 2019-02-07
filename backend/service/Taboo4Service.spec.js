// @formatter:off
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const sinon = require("sinon");

const TabooSet = require("../data/TabooSet");
const Bookmark = require("../data/Bookmark");
const DBEntry = require("../data/DBEntry");
const DynamoDBDocClient = require("../data/DynamoDBDocClient");
const Taboo4Service = require("../service/Taboo4Service");

const TableName = "TestTable";
// @formatter:on

afterEach(() => {
    sinon.restore();
});

describe("a Taboo4Service", () => {

    const docClient = new DynamoDBDocClient();

    describe("when storing", () => {

        it("a single DBEntry calls the documentclient", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "id", bookmark);
            const docClientFuncPut = sinon.stub(docClient, "put");
            docClientFuncPut.callsArg(1); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            await taboo4Service.saveDBEntry(dbEntry);

            docClientFuncPut.calledOnce.should.be.true;

            const params = docClientFuncPut.firstCall.args[0];
            params.TableName.should.equal(TableName);
            params.Item.partition.should.equal(bookmark.id)
            params.Item.sort.should.equal("id");
            params.Item.getBookmark().should.deep.equal(bookmark);
        });

        describe(" a single bookmark", () => {
            it("deletes the entry with the previous id", async () => {
                const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
                const taboo4Service = new Taboo4Service(docClient, TableName);
                const taboo4ServiceFuncDeleteBookmarkById = sinon.stub(taboo4Service, "deleteBookmarkById");
                taboo4ServiceFuncDeleteBookmarkById.resolves("deleted");
                const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
                taboo4ServiceFuncSaveDbEntry.resolves("success");
                const taboo4ServiceFuncAllTags = sinon.stub(taboo4Service, "allTagsFromDB");
                taboo4ServiceFuncAllTags.resolves([]);

                await taboo4Service.saveBookmark(bookmark, "someid");

                expect(taboo4ServiceFuncDeleteBookmarkById.callCount).to.equal(1);
                const params = taboo4ServiceFuncDeleteBookmarkById.firstCall.args[0];
                expect(params).to.equal("someid")
            });

            it("does not delete an entry when no previous id is given", async () => {
                const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
                const taboo4Service = new Taboo4Service(docClient, TableName);
                const taboo4ServiceFuncDeleteBookmarkById = sinon.stub(taboo4Service, "deleteBookmarkById");
                taboo4ServiceFuncDeleteBookmarkById.resolves("deleted");
                const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
                taboo4ServiceFuncSaveDbEntry.resolves("success");
                const taboo4ServiceFuncAllTags = sinon.stub(taboo4Service, "allTagsFromDB");
                taboo4ServiceFuncAllTags.resolves([]);

                await taboo4Service.saveBookmark(bookmark, "");

                expect(taboo4ServiceFuncDeleteBookmarkById.callCount).to.equal(0);
            });

            it("saves DBEntry objects for the id, for each tag and for all tags", async () => {

                const allTags = ["tag01", "tag02"];
                const bookmark = new Bookmark("url01", "title01", allTags);
                const expectedPrimaryKeys = new TabooSet();
                expectedPrimaryKeys.add([bookmark.id, "id"]);
                expectedPrimaryKeys.add(["tag01", bookmark.id]);
                expectedPrimaryKeys.add(["tag02", bookmark.id]);
                expectedPrimaryKeys.add(["all tags", "all tags"]);
                const taboo4Service = new Taboo4Service(docClient, TableName);
                const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
                taboo4ServiceFuncSaveDbEntry.resolves("success");
                const taboo4ServiceFuncAllTags = sinon.stub(taboo4Service, "allTagsFromDB");
                taboo4ServiceFuncAllTags.resolves(allTags);

                await taboo4Service.saveBookmark(bookmark);

                taboo4ServiceFuncSaveDbEntry.callCount.should.equal(4);
                const realPrimaryKeys = new TabooSet();
                taboo4ServiceFuncSaveDbEntry
                    .getCalls()
                    .map(it => it.args[0])
                    .forEach(dbEntry => {
                        realPrimaryKeys.add([dbEntry.partition, dbEntry.sort]);
                        if (dbEntry.partition !== "all tags") {
                            dbEntry.getBookmark().should.deep.equal(bookmark);
                        } else {
                            expect(dbEntry.getBookmark()).to.deep.equal(allTags);
                        }
                    });

                realPrimaryKeys.should.deep.equal(expectedPrimaryKeys);
            });

        });

        it("saves an array ", async () => {
            const bookmark1 = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const bookmark2 = new Bookmark("url02", "title02", ["tag02", "tag03"]);
            const allTags = ["tag01", "tag02", "tag03"];
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const taboo4ServiceFuncSaveBookmark = sinon.stub(taboo4Service, "saveBookmark");
            taboo4ServiceFuncSaveBookmark.resolves("success");
            const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
            taboo4ServiceFuncSaveDbEntry.resolves("success");
            const taboo4ServiceFuncAllTags = sinon.stub(taboo4Service, "allTagsFromDB");
            taboo4ServiceFuncAllTags.resolves(allTags);

            await taboo4Service.saveBookmarks([bookmark1, bookmark2]);

            taboo4ServiceFuncSaveBookmark.callCount.should.equal(2);

        });
    });

    describe("when retrieving", () => {

        it("returns an existing bookmark", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "id", bookmark);
            const docClientFuncGet = sinon.stub(docClient, "get");
            docClientFuncGet.callsArgWith(1, null, {Item: dbEntry}); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundBookmark = await taboo4Service.loadBookmark("someid");

            foundBookmark.should.deep.equal(bookmark);
        });

        it("returns empty object on an no existing bookmark", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const docClientFuncGet = sinon.stub(docClient, "get");
            docClientFuncGet.callsArgWith(1, null, {}); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundBookmark = await taboo4Service.loadBookmark("someid");

            expect(foundBookmark).to.be.undefined
        });

        it("returns all bookmarks", async () => {
            const bookmark1 = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const bookmark2 = new Bookmark("url02", "title02", ["tag02", "tag03"]);
            const bookmark3 = new Bookmark("url03", "title03", ["tag03", "tag04"]);
            const dbEntry1 = new DBEntry(bookmark1.id, "id", bookmark1);
            const dbEntry2 = new DBEntry(bookmark2.id, "id", bookmark2);
            const dbEntry3 = new DBEntry(bookmark3.id, "id", bookmark3);
            const expectedBookmarks = new TabooSet([bookmark1, bookmark2, bookmark3]);
            // the stub returns the three bookmarks in two pages to check that the service handles paging
            const docClientFuncScan = sinon.stub(docClient, "scan");
            docClientFuncScan.onCall(0).callsArgWith(1, null, {LastEvaluatedKey: 2, Items: [dbEntry1, dbEntry2]});
            docClientFuncScan.onCall(1).callsArgWith(1, null, {Items: [dbEntry3]});
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundBookmarks = await taboo4Service.allBookmarks();

            expectedBookmarks.should.deep.equal(new TabooSet(foundBookmarks));
        });

        it("returns all tags as sorted array from DB", async () => {
            const bookmark1 = new Bookmark("url01", "title01", ["tag09", "tag07"]);
            const bookmark2 = new Bookmark("url02", "title02", ["tag08", "tag06"]);
            const bookmark3 = new Bookmark("url03", "title03", ["tag07", "tag08"]);
            const dbEntry1 = new DBEntry(bookmark1.id, "id", bookmark1);
            const dbEntry2 = new DBEntry(bookmark2.id, "id", bookmark2);
            const dbEntry3 = new DBEntry(bookmark3.id, "id", bookmark3);
            const docClientFuncScan = sinon.stub(docClient, "scan");
            docClientFuncScan.onCall(0).callsArgWith(1, null, {Items: [dbEntry1, dbEntry2, dbEntry3]});
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundTags = await taboo4Service.allTagsFromDB();

            foundTags.should.deep.equal(["tag06", "tag07", "tag08", "tag09"]);
        });

        describe("by tags", () => {
            it("returns empty array for unknown tags", async () => {
                const docClientFuncQuery = sinon.stub(docClient, "query");
                docClientFuncQuery.onCall(0).callsArgWith(1, null, {Items: []});
                docClientFuncQuery.onCall(1).callsArgWith(1, null, {Items: []});
                const taboo4Service = new Taboo4Service(docClient, TableName);

                const foundBookmarks = await taboo4Service.bookmarksByTags(["tag01", "tag02"]);

                foundBookmarks.should.deep.equal([]);
            });

            it("finds bookmarks for given tags that have all the tags", async () => {
                const bookmark1 = new Bookmark("url01", "title01", ["tag09", "tag07"]);
                const bookmark3 = new Bookmark("url03", "title03", ["tag07", "tag08"]);
                const dbEntry1 = new DBEntry(bookmark1.id, "id", bookmark1);
                const dbEntry3 = new DBEntry(bookmark3.id, "id", bookmark3);
                const docClientFuncQuery = sinon.stub(docClient, "query");
                docClientFuncQuery.onCall(0).callsArgWith(1, null, {Items: [dbEntry1, dbEntry3]});
                docClientFuncQuery.onCall(1).callsArgWith(1, null, {Items: [dbEntry1]});
                const taboo4Service = new Taboo4Service(docClient, TableName);

                const foundBookmarks = await taboo4Service.bookmarksByTags(["tag07", "tag09"]);

                foundBookmarks.length.should.equal(1);
                foundBookmarks.should.deep.include(bookmark1);
            });
        });
    });

    describe("when deleting", () => {

        it("a single DBEntry calls the documentclient", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const docClientFuncDelete = sinon.stub(docClient, "delete");
            docClientFuncDelete.callsArg(1); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            await taboo4Service.deleteDBEntry(bookmark.id, "id");

            docClientFuncDelete.calledOnce.should.be.true;

            const params = docClientFuncDelete.firstCall.args[0];
            params.TableName.should.equal(TableName);
            params.Key.partition.should.equal(bookmark.id)
            params.Key.sort.should.equal("id");
        });

        it("a bookmark deletes DBEntry objects for the id and for each tag", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const expectedKeys = new TabooSet();
            expectedKeys.add([bookmark.id, "id"]);
            expectedKeys.add(["tag01", bookmark.id]);
            expectedKeys.add(["tag02", bookmark.id]);
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const taboo4ServiceFuncDeleteDbEntry = sinon.stub(taboo4Service, "deleteDBEntry");
            taboo4ServiceFuncDeleteDbEntry.resolves("success");
            const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
            taboo4ServiceFuncSaveDbEntry.resolves("success");
            const taboo4ServiceFuncAllTags = sinon.stub(taboo4Service, "allTagsFromDB");
            taboo4ServiceFuncAllTags.resolves([]);

            await taboo4Service.deleteBookmark(bookmark);

            taboo4ServiceFuncDeleteDbEntry.callCount.should.equal(3);
            const realKeys = new TabooSet();
            taboo4ServiceFuncDeleteDbEntry
                .getCalls()
                .forEach(call => {
                    realKeys.add([call.args[0], call.args[1]]);
                });

            realKeys.should.deep.equal(expectedKeys);
        });

        it("by id it retrieves the bookmark first", async () => {
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const taboo4ServiceFuncLoadBookmark = sinon.stub(taboo4Service, "loadBookmark");
            taboo4ServiceFuncLoadBookmark.resolves(bookmark);
            const taboo4ServiceFuncDeleteBookmark = sinon.stub(taboo4Service, "deleteBookmark");
            taboo4ServiceFuncDeleteBookmark.resolves("success");

            await taboo4Service.deleteBookmarkById(bookmark.id);

            taboo4ServiceFuncLoadBookmark.callCount.should.equal(1);
            taboo4ServiceFuncLoadBookmark.firstCall.args[0].should.equal(bookmark.id);

            taboo4ServiceFuncDeleteBookmark.callCount.should.equal(1);
            taboo4ServiceFuncDeleteBookmark.firstCall.args[0].should.deep.equal(bookmark);
        });

    });

    it("can load a website's title", async () => {
        const taboo4Service = new Taboo4Service(docClient, TableName);

        const title = await taboo4Service.loadTitle("https://www.sothawo.com/");

        expect(title).to.equal("sothawo | software: ( design | development | knowledge )");
    })
});
