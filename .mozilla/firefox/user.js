// Disable about:config warning
user_pref("browser.aboutConfig.showWarning", false);

// Set search region and locale
user_pref("browser.search.region", "CA");
user_pref("browser.search.isUS", false);
user_pref("distribution.searchplugins.defaultLocale", "en-CA");
user_pref("general.useragent.locale", "en-CA");

// Theme settings
user_pref("devtools.theme", "auto");
user_pref("extensions.activeThemeID", "default-theme@mozilla.org");
user_pref("browser.display.use_system_colors", true);

// Hardware video decoding support
user_pref("gfx.webrender.all", true);
user_pref("media.ffmpeg.vaapi.enabled", true);

// Enable user chrome
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Site isolation
user_pref("fission.autostart", true);

// Startup page
user_pref("browser.startup.page", 3); // Always resume the previous browser session

// Font preferences for CJK and Japanese
user_pref("font.cjk_pref_fallback_order", "ja,zh-cn,zh-hk,zh-tw");

user_pref("font.name.monospace.zh-CN", "Sarasa Mono SC");
user_pref("font.name.serif.zh-CN", "Source Han Serif SC");
user_pref("font.name.sans-serif.zh-CN", "Source Han Sans SC");
user_pref("font.name.cursive.zh-CN", "AR PL UKai CN");

user_pref("font.name.monospace.zh-HK", "Sarasa Mono HC");
user_pref("font.name.serif.zh-HK", "Source Han Serif HC");
user_pref("font.name.sans-serif.zh-HK", "Source Han Sans HC");
user_pref("font.name.cursive.zh-HK", "AR PL UKai HK");

user_pref("font.name.monospace.zh-TW", "Sarasa Mono TC");
user_pref("font.name.serif.zh-TW", "Source Han Serif TC");
user_pref("font.name.sans-serif.zh-TW", "Source Han Sans TC");
user_pref("font.name.cursive.zh-TW", "AR PL UKai TW");

user_pref("font.name.monospace.ja", "Sarasa Mono J");
user_pref("font.name.serif.ja", "Source Han Serif");
user_pref("font.name.sans-serif.ja", "Source Han Sans");
// user_pref("font.name.cursive.ja", "");