// @formatter:off
const should            = require("chai").should();
const sinon             = require("sinon");

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

    describe("when storing", () => {

        const docClient = new DynamoDBDocClient();

        it("a single DBEntry calls the documentclient", async () => {
            const docClientFuncPut = sinon.stub(docClient, "put");
            docClientFuncPut.callsArg(1);
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);
            const dbEntry = new DBEntry(bookmark.id, "", bookmark);

            await taboo4Service.saveDBEntry(dbEntry);

            docClientFuncPut.calledOnce.should.be.true;

            const params = docClientFuncPut.firstCall.args[0];
            params.TableName.should.equal(TableName);
            params.Item.partition.should.equal(bookmark.id)
            params.Item.sort.should.equal("");
            params.Item.bookmark.should.equal(bookmark);
        });

        it("a bookmark saves DBEntry objects for the id and for each tag", async () => {
            const taboo4Service = new Taboo4Service(docClient, TableName);
            const taboo4ServiceFuncSaveDbEntry = sinon.stub(taboo4Service, "saveDBEntry");
            taboo4ServiceFuncSaveDbEntry.resolves("success");
            const bookmark = new Bookmark("url01", "title01", ["tag01", "tag02"]);

            await taboo4Service.saveBookmark(bookmark);

            taboo4ServiceFuncSaveDbEntry.callCount.should.equal(3);

            let dbEntry = taboo4ServiceFuncSaveDbEntry.getCall(0).args[0];
            dbEntry.partition.should.equal(bookmark.id);
            dbEntry.sort.should.equal("id");
            dbEntry.bookmark.should.equal(bookmark);

            dbEntry = taboo4ServiceFuncSaveDbEntry.getCall(1).args[0];
            dbEntry.partition.should.equal(bookmark.tags[0]);
            dbEntry.sort.should.equal(bookmark.id);
            dbEntry.bookmark.should.equal(bookmark);

            dbEntry = taboo4ServiceFuncSaveDbEntry.getCall(2).args[0];
            dbEntry.partition.should.equal(bookmark.tags[1]);
            dbEntry.sort.should.equal(bookmark.id);
            dbEntry.bookmark.should.equal(bookmark);
        });
    });
});
