const should = require("chai").should();
const sinon = require("sinon");

const Bookmark = require("./Bookmark");
const DBEntry = require("./DBEntry");
const Taboo4 = require("./Taboo4");
const TableName = "TestTable";

afterEach(() => {
    sinon.restore();
});

describe("a Taboo4", () => {

    describe("when storing", () => {
        // create a taboo4 service with a db mock
        const docClient = {
            put: function (params, callback) {
            }
        };

        it("a single DBEntry calls the documentclient", () => {
            const docClientPut = sinon.spy(docClient, "put");
            const taboo4 = new Taboo4(docClient, TableName);
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "", bookmark);

            taboo4.saveDBEntry(dbEntry);

            docClientPut.calledOnce.should.be.true;

            const params = docClientPut.firstCall.args[0];
            params.TableName.should.equal(TableName);
            params.Item.partition.should.equal(bookmark.id)
            params.Item.sort.should.equal("");
            params.Item.bookmark.should.equal(bookmark);
        });

        it("a bookmark saves DBEntry objects for the id and for each tag", () => {
            const taboo4 = new Taboo4(docClient, TableName);
            const taboo4SaveDbEntry = sinon.spy(taboo4, "saveDBEntry");
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);

            taboo4.saveBookmark(bookmark);

            taboo4SaveDbEntry.callCount.should.equal(3);

            let dbEntry = taboo4SaveDbEntry.getCall(0).args[0];
            dbEntry.partition.should.equal(bookmark.id);
            dbEntry.sort.should.equal("");
            dbEntry.bookmark.should.equal(bookmark);

            dbEntry = taboo4SaveDbEntry.getCall(1).args[0];
            dbEntry.partition.should.equal(bookmark.tags[0]);
            dbEntry.sort.should.equal(bookmark.id);
            dbEntry.bookmark.should.equal(bookmark);

            dbEntry = taboo4SaveDbEntry.getCall(2).args[0];
            dbEntry.partition.should.equal(bookmark.tags[1]);
            dbEntry.sort.should.equal(bookmark.id);
            dbEntry.bookmark.should.equal(bookmark);
        });
    });
});
