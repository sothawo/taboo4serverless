// @formatter:off
const chai              = require("chai");
const expect            = chai.expect;
const should            = chai.should();
const sinon             = require("sinon");

const TabooSet          = require("../data/TabooSet");
const Bookmark          = require("../data/Bookmark");
const DBEntry           = require("../data/DBEntry");
const DynamoDBDocClient = require("../data/DynamoDBDocClient");
const Taboo4Service     = require("../service/Taboo4Service");

const TableName         = "TestTable";
// @formatter:on

afterEach(() => {
    sinon.restore();
});

describe("a Taboo4Service", () => {

    const docClient = new DynamoDBDocClient();

    describe("when storing", () => {

        it("a single DBEntry calls the documentclient", async () => {
            const docClientFuncPut = sinon.stub(docClient, "put");
            docClientFuncPut.callsArg(1); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "id", bookmark);

            await taboo4Service.saveDBEntry(dbEntry);

            docClientFuncPut.calledOnce.should.be.true;

            const params = docClientFuncPut.firstCall.args[0];
            params.TableName.should.equal(TableName);
            params.Item.partition.should.equal(bookmark.id)
            params.Item.sort.should.equal("id");
            params.Item.getBookmark().should.deep.equal(bookmark);
        });

        it("a bookmark saves DBEntry objects for the id and for each tag", async () => {
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
            taboo4ServiceFuncSaveDbEntry.resolves("success");
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);

            const expectedPrimaryKeys = new TabooSet();
            expectedPrimaryKeys.add([bookmark.id, "id"]);
            expectedPrimaryKeys.add(["tag01", bookmark.id]);
            expectedPrimaryKeys.add(["tag02", bookmark.id]);

            await taboo4Service.saveBookmark(bookmark);

            taboo4ServiceFuncSaveDbEntry.callCount.should.equal(3);
            const realPrimaryKeys = new TabooSet();
            taboo4ServiceFuncSaveDbEntry
                .getCalls()
                .map(it => it.args[0])
                .forEach(dbEntry => {
                    realPrimaryKeys.add([dbEntry.partition, dbEntry.sort]);
                    dbEntry.getBookmark().should.deep.equal(bookmark);
                });

            realPrimaryKeys.should.deep.equal(expectedPrimaryKeys);
        });
    });

    describe("when retrieving", () => {

        it("returns an existing bookmark", async () => {
            const docClientFuncGet = sinon.stub(docClient, "get");
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "", bookmark);
            docClientFuncGet.callsArgWith(1, null, {Item: dbEntry}); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundBookmark = await taboo4Service.loadBookmark("someid");

            foundBookmark.should.deep.equal(bookmark);
        });

        it("returns empty object on an no existing bookmark", async () => {
            const docClientFuncGet = sinon.stub(docClient, "get");
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            docClientFuncGet.callsArgWith(1, null, {}); // let the stub call the callback function that is passed as second arg
            const taboo4Service = new Taboo4Service(docClient, TableName);

            const foundBookmark = await taboo4Service.loadBookmark("someid");

            foundBookmark.should.deep.equal({})
        });
    });
});
