const DiscordUtil = {};

/**
 * @type {Object.<number, string>}
 */
const userFlags = {
    0: "None",
    1: "Discord Employee",
    2: "Discord Partner",
    4: "HypeSquad Events",
    8: "Bug Hunter Level 1",
    64: "House Bravery",
    128: "House Brilliance",
    256: "House Balance",
    512: "Early Supporter",
    1024: "Team User",
    4096: "System",
    16384: "Bug Hunter Level 2",
    65536: "Verified Bot",
    131072: "Verified Bot Developer"
};

/**
 * @type {Object.<number, string>}
 */
const premiumTypes = {
    0: "None",
    1: "Nitro Classic",
    2: "Nitro"
};

/**
 * Censor Text
 * @param {string} text 
 */
DiscordUtil.censorText = (text) => {
    if (text.length < 5) return '*'.repeat(text.length); // Any text below 5 characters will be censored.
    return text[0] + '*'.repeat(text.length - 1); // Any text above 5 characters will be censored besides the first letter.
};

/**
 * Censor a domain name
 * @param {string} domainName 
 */
DiscordUtil.censorDomain = (domainName) => {
    const [emailAddress, tld] = domainName.split('.');
    return '@' + '*'.repeat(emailAddress.length) + '.' + tld;
};


/**
 * Get id creation time
 * @param {string} id 
 */
DiscordUtil.getDate = (id) => {
    if (!id) return;

    const unixInMilli = (id / 4194304) + 1420070400000;
    const date = new Date(unixInMilli);

    return {
        ISO: date.toISOString(),
        Unix: unixInMilli / 1000 | 0,
        UTC: date.toUTCString()
    }
};

/**
 * Return Image URL depending on the type you're requesting.
 * @param {string} id - discord id
 * @param {string} hash // hash of what
 * @param {string} type // type of what
 * @param {string} ext // name doesn't make sense
 * @param {number} discrimnator
 */
DiscordUtil.getImageUrl = (...options) => {
    // too many arguments in function is bad
    const [id, hash, type, ext = "png", discriminator = null] = options;

    // validate each variable

    ext = ext.toLowerCase();
    const baseURL = "https://cdn.discordapp.com/";
    let pathURL = "";
    const queryString = `?size=128`;
    let supportedFileExts = [];

    switch (type) {
        case "default_avatar":
            supportedFileExts = ["png"];

            if (!discriminator) throw new Error('To return the default_avatar you must provided the user\'s discriminator.');

            if (!ext.includes(supportedFileExts)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);

            const user_discriminator = 1337 % discriminator;

            return baseURL + `embed/avatars/${user_discriminator}.${ext}${queryString}`
        case "user_avatar":
        case "guild_icon":
            supportedFileExts = ["png", "jpeg", 'jpg', "webp", "gif"];

            if (!supportedFileExts.includes(ext)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);

            pathURL = type == "user_avatar" ? `avatars/${id}/${hash}.${hash.startsWith('a_') ? "gif" : ext}` : `icons/${id}/${hash}.${hash.startsWith('a_') ? "gif" : ext}` + queryString;

            return baseURL + pathURL;
        case "guild_banner":
            supportedFileExts = ["png", "jpeg", "jpg", "webp"];
            pathURL = `banners/${id}/${hash}.${ext}`;

            if (!ext.includes(supportedFileExts)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);

            return baseURL + pathURL;
        default:
            throw new Error(`${type} is not supported!`);
    }
};

module.exports = DiscordUtil;
