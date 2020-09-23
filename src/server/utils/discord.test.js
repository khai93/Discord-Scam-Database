const assert = require('assert');
const { DiscordUtil } = require("../utils/")
describe('DiscordUtil', function() {
    describe('#censorText', function() {

        it('should return asterieks for every char if length is less than 5', function() {
            assert.equal(DiscordUtil.censorText("chat"), "****");
            assert.equal(DiscordUtil.censorText("cha"), "***");
            assert.equal(DiscordUtil.censorText("at"), "**");
            assert.equal(DiscordUtil.censorText("a"), "*");
        })

        it('should censor everything except the first character if length is greater than or equal to 5', function() {
            assert.equal(DiscordUtil.censorText("longtext"), "l*******")
        })

    })
    
})