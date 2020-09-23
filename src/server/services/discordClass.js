const userFlags = {
    0 : "None",
    1 : "Discord Employee",
    2 : "Discord Partner",
    4 : "HypeSquad Events",
    8 : "Bug Hunter Level 1",
    64 : "House Bravery",
    128 : "House Brilliance",
    256 : "House Balance",
    512 : "Early Supporter",
    1024 : "Team User",
    4096 : "System",
    16384 : "Bug Hunter Level 2",
    65536 : "Verified Bot",
    131072 : "Verified Bot Developer"
}

const premiumTypes = {
    0 : "None",
    1 : "Nitro Classic",
    2 : "Nitro"
}

const censorText = emailUser => {
    if(emailUser.length < 5 ) return '*'.repeat(emailUser.length); // Any email name below 5 characters will be censored.
    return emailUser[0] + '*'.repeat(emailUser.length - 1); // Any email name above 5 characters will be censored besides the first letter.
}

const censorDomain = domainName => {
    const [emailAddress , tld] = domainName.split('.');
    return '@' + '*'.repeat(emailAddress.length) + '.' + tld;
}

class Discord{
    getDate(id){ // Reversing Discord Snowflake into Date
        if(!id) return;

        const unixInMilli = (id / 4194304) + 1420070400000;
        const date = new Date(unixInMilli);
        
        return {ISO : date.toISOString() , Unix : unixInMilli / 1000 | 0 , UTC : date.toUTCString()}
    }
    getImageURL(id , hash , type , ext = "png" , discriminator = null){ // Return Image URL depending on the type you're requesting.
        ext = ext.toLowerCase();
        const baseURL = "https://cdn.discordapp.com/";
        let pathURL = "";
        const queryString = `?size=128`;
        let supportedFileExts = [];

        switch(type){
            case "default_avatar":
                supportedFileExts = ["png"];

                if(!discriminator) throw new Error('To return the default_avatar you must provided the user\'s discriminator.');

                if(!ext.includes(supportedFileExts)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);
                
                const user_discriminator = 1337 % discriminator;

                return baseURL + `embed/avatars/${user_discriminator}.${ext}${queryString}`
            case "user_avatar":
            case "guild_icon":
                supportedFileExts = ["png","jpeg",'jpg',"webp","gif"];

                if(!supportedFileExts.includes(ext)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);

                pathURL = type == "user_avatar" ? `avatars/${id}/${hash}.${hash.startsWith('a_') ? "gif" : ext}` : `icons/${id}/${hash}.${hash.startsWith('a_') ? "gif" : ext}` + queryString;

                return baseURL + pathURL;
            case "guild_banner":
                supportedFileExts = ["png","jpeg","jpg","webp"];
                pathURL = `banners/${id}/${hash}.${ext}`;

                if(!ext.includes(supportedFileExts)) throw new Error(`The file extension ${ext} is not supported. Please use one of the extensions from this list ${supportedFileExts}.`);
                
                return baseURL + pathURL;
            default:
                throw new Error(`${type} is not supported!`);
        }   
    }
    censorEmailAddress(email){
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!regex.test(email)) throw new Error('This is not a email.')

        let [emailUser , emailDomain] = email.split('@');
        emailUser = censorText(emailUser);
        emailDomain = censorDomain(emailDomain);
    
        return emailUser + emailDomain;
    }
}

const discordInstance = new Discord();
console.log(discordInstance.censorEmailAddress("31231@gmail.com"))