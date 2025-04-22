 /* 0102: set startup page [SETUP-CHROME]
  * 0=blank, 1=home, 2=last visited page, 3=resume previous session
  * [NOTE] Session Restore is cleared with history (2811+), and not used in Private Browsing mode
  * [SETTING] General>Startup>Restore previous session ***/
    user_pref("browser.startup.page", 3);
 /* 0106: clear default topsites
  * [NOTE] This does not block you from adding your own ***/
    user_pref("browser.newtabpage.activity-stream.default.sites", "");

 /* 0403: disable SB checks for downloads (remote)
  * To verify the safety of certain executable files, Firefox may submit some information about the
  * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
  * Safe Browsing service which helps Firefox determine whether or not the file should be blocked
  * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override this ***/
    user_pref("browser.safebrowsing.downloads.remote.url", ""); // Defense-in-depth

 /* 0706: disable proxy bypass for system request failures [FF95+]
  * RemoteSettings, UpdateService, Telemetry [1]
  * [WARNING] If false, this will break the fallback for some security features
  * [SETUP-CHROME] If you use a proxy and you understand the security impact
  * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1732792,1733994,1733481 ***/
    user_pref("network.proxy.allow_bypass", false);
 /* 0710: enable DNS-over-HTTPS (DoH) [FF60+]
  * 0=default, 2=increased (TRR (Trusted Recursive Resolver) first), 3=max (TRR only), 5=off (no rollout)
  * see "doh-rollout.home-region": USA 2019, Canada 2021, Russia/Ukraine 2022 [3]
  * [SETTING] Privacy & Security>DNS over HTTPS
  * [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
  * [2] https://wiki.mozilla.org/Security/DOH-resolver-policy
  * [3] https://support.mozilla.org/kb/firefox-dns-over-https
  * [4] https://www.eff.org/deeplinks/2020/12/dns-doh-and-odoh-oh-my-year-review-2020 ***/
    user_pref("network.trr.mode", 3);
 /* 0712: set DoH provider
  * The custom uri is the value shown when you "Choose provider>Custom>"
  * [NOTE] If you USE custom then "network.trr.uri" should be set the same
  * [SETTING] Privacy & Security>DNS over HTTPS>Increased/Max>Choose provider ***/
    user_pref("network.trr.uri", "https://dns.google/dns-query");
    user_pref("network.trr.custom_uri", "https://dns.google/dns-query");

 /* 0807: disable urlbar clipboard suggestions [FF118+] ***/
    user_pref("browser.urlbar.clipboard.featureGate", false);
 /* 0808: disable recent searches [FF120+]
  * [NOTE] Recent searches are cleared with history (2811+)
  * [1] https://support.mozilla.org/kb/search-suggestions-firefox ***/
    user_pref("browser.urlbar.recentsearches.featureGate", false);
 /* 0815: disable tab-to-search [FF85+]
  * Alternatively, you can exclude on a per-engine basis by unchecking them in Options>Search
  * [SETTING] Search>Address Bar>When using the address bar, suggest>Search engines ***/
    user_pref("browser.urlbar.suggest.engines", false);
 /* 0820: disable coloring of visited links
  * [SETUP-HARDEN] Bulk rapid history sniffing was mitigated in 2010 [1][2]. Slower and more expensive
  * redraw timing attacks were largely mitigated in FF77+ [3]. Using RFP (4501) further hampers timing
  * attacks. Don't forget clearing history on exit (2811+). However, social engineering [2#limits][4][5]
  * and advanced targeted timing attacks could still produce usable results
  * [1] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector
  * [2] https://dbaron.org/mozilla/visited-privacy
  * [3] https://bugzilla.mozilla.org/1632765
  * [4] https://earthlng.github.io/testpages/visited_links.html (see github wiki APPENDIX A on how to use)
  * [5] https://lcamtuf.blogspot.com/2016/08/css-mix-blend-mode-is-bad-for-keeping.html ***/
    user_pref("layout.css.visited_links_enabled", false);

 /* 0906: enforce no automatic authentication on Microsoft sites [FF91+] [WINDOWS 10+]
  * [SETTING] Privacy & Security>Logins and Passwords>Allow Windows single sign-on for...
  * [1] https://support.mozilla.org/kb/windows-sso ***/
    // user_pref("network.http.windows-sso.enabled", false); // [DEFAULT: false]
 /* 0907: enforce no automatic authentication on Microsoft sites [FF131+] [MAC]
  * On macOS, SSO only works on corporate devices ***/
    // user_pref("network.http.microsoft-entra-sso.enabled", false); // [DEFAULT: false]

 /** MIXED CONTENT ***/
 /* 1241: disable insecure passive content (such as images) on https pages ***/
    user_pref("security.mixed_content.block_display_content", true); // Defense-in-depth (see 1244)
 /* 1244: enable HTTPS-Only mode in all windows
  * When the top-level is HTTPS, insecure subresources are also upgraded (silent fail)
  * [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On (after "Continue to HTTP Site")
  * [SETTING] Privacy & Security>HTTPS-Only Mode (and manage exceptions)
  * [TEST] http://example.com [upgrade]
  * [TEST] http://httpforever.com/ | http://http.rip [no upgrade] ***/
    user_pref("dom.security.https_only_mode_pbm", true); // [FF80+]
 /* 1245: enable HTTPS-Only mode for local resources [FF77+] ***/
    user_pref("dom.security.https_only_mode.upgrade_local", true);

 /* 1702: set behavior on "+ Tab" button to display container menu on left click [FF74+]
  * [NOTE] The menu is always shown on long press and right click
  * [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
    user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);
 /* 1703: set external links to open in site-specific containers [FF123+]
  * [SETUP-WEB] Depending on your container extension(s) and their settings
  * true=Firefox will not choose a container (so your extension can)
  * false=Firefox will choose the container/no-container (default)
  * [1] https://bugzilla.mozilla.org/1874599 ***/
    // user_pref("browser.link.force_default_user_context_id_for_external_opens", true);

 /* 2004: force exclusion of private IPs from ICE candidates [FF51+]
  * [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
  * grant device access, but often results in breakage on video-conferencing platforms ***/
    // user_pref("media.peerconnection.ice.no_host", true);
 /* 2020: disable GMP (Gecko Media Plugins)
  * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
    // user_pref("media.gmp-provider.enabled", false);

 /* 2615: disable websites overriding Firefox's keyboard shortcuts [FF58+]
  * 0 (default) or 1=allow, 2=block
  * [SETTING] to add site exceptions: Ctrl+I>Permissions>Override Keyboard Shortcuts ***/
    // user_pref("permissions.default.shortcuts", 2);

 /* 2619: use Punycode in Internationalized Domain Names to eliminate possible spoofing
  * [SETUP-WEB] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded
  * [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
  * [1] https://wiki.mozilla.org/IDN_Display_Algorithm
  * [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
  * [3] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=punycode+firefox
  * [4] https://www.xudongz.com/blog/2017/idn-phishing/ ***/
//  user_pref("network.IDN_show_punycode", true);

 /** EXTENSIONS ***/
 /* 2660: limit allowed extension directories
  * 1=profile, 2=user, 4=application, 8=system, 16=temporary, 31=all
  * The pref value represents the sum: e.g. 5 would be profile and application directories
  * [SETUP-CHROME] Breaks usage of files which are installed outside allowed directories
  * [1] https://archive.is/DYjAM ***/

 /* 2662: disable webextension restrictions on certain mozilla domains (you also need 4503) [FF60+]
  * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
    user_pref("extensions.webextensions.restrictedDomains", "");

 /* 2813: set Session Restore to clear on shutdown (if 2810 is true) [FF34+]
  * [NOTE] Not needed if Session Restore is not used (0102) or it is already cleared with history (2811+)
  * [NOTE] If true, this prevents resuming from crashes (also see 5008) ***/
    // user_pref("privacy.clearOnShutdown.openWindows", true);

 /** SANITIZE MANUAL: TIMERANGE ***/
 /* 2840: set "Time range to clear" for "Clear Data" (2820+) and "Clear History" (2830+)
  * Firefox remembers your last choice. This will reset the value when you start Firefox
  * 0=everything, 1=last hour, 2=last two hours, 3=last four hours, 4=today
  * [NOTE] Values 5 (last 5 minutes) and 6 (last 24 hours) are not listed in the dropdown,
  * which will display a blank value, and are not guaranteed to work ***/
 user_pref("privacy.sanitize.timeSpan", 0);

 /* 4001: enable FPP in PB mode [FF114+]
  * [NOTE] In FF119+, FPP for all modes (7016) is enabled with ETP Strict (2701) ***/
    // user_pref("privacy.fingerprintingProtection.pbmode", true); // [DEFAULT: true]
 /* 4002: set global FPP overrides [FF114+]
  * uses "RFPTargets" [1] which despite the name these are not used by RFP
  * e.g. "+AllTargets,-CSSPrefersColorScheme,-JSDateTimeUTC" = all targets but allow prefers-color-scheme and do not change timezone
  * e.g. "-AllTargets,+CanvasRandomization,+JSDateTimeUTC" = no targets but do use FPP canvas and change timezone
  * [NOTE] Not supported by arkenfox. Either use RFP or FPP at defaults
  * [1] https://searchfox.org/mozilla-central/source/toolkit/components/resistfingerprinting/RFPTargets.inc ***/
    // user_pref("privacy.fingerprintingProtection.overrides", "");
 /* 4003: set granular FPP overrides
  * JSON format: e.g."[{\"firstPartyDomain\": \"netflix.com\", \"overrides\": \"-CanvasRandomization,-FrameRate,\"}]"
  * [NOTE] Not supported by arkenfox. Either use RFP or FPP at defaults ***/
    // user_pref("privacy.fingerprintingProtection.granularOverrides", "");
 /* 4004: disable remote FPP overrides [FF127+] ***/
    // user_pref("privacy.fingerprintingProtection.remoteOverrides.enabled", false);
 
 /*** [SECTION 4500]: OPTIONAL RFP (resistFingerprinting)
    RFP overrides FPP (4000)
 user_pref("_user.js.parrot", "4500 syntax error: the parrot's popped 'is clogs");
 /* 4501: enable RFP
  * [NOTE] pbmode applies if true and the original pref is false
  * [SETUP-WEB] RFP can cause some website breakage: mainly canvas, use a canvas site exception via the urlbar.
  * RFP also has a few side effects: mainly that timezone is GMT, and websites will prefer light theme ***/
    user_pref("privacy.resistFingerprinting", true); // [FF41+]
    user_pref("privacy.resistFingerprinting.pbmode", true); // [FF114+]
 /* 4504: enable letterboxing [FF67+]
  * Dynamically resizes the inner window by applying margins in stepped ranges [2]
  * If you use the dimension pref, then it will only apply those resolutions.
  * The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000")
  * [SETUP-WEB] This is independent of RFP (4501). If you're not using RFP, or you are but
  * dislike the margins, then flip this pref, keeping in mind that it is effectively fingerprintable
  * [WARNING] DO NOT USE: the dimension pref is only meant for testing
  * [1] https://bugzilla.mozilla.org/1407366
  * [2] https://hg.mozilla.org/mozilla-central/rev/7211cb4f58ff#l5.13 ***/
    user_pref("privacy.resistFingerprinting.letterboxing", true); // [HIDDEN PREF]
    user_pref("privacy.resistFingerprinting.letterboxing.dimensions", ""); // [HIDDEN PREF]
 /* 4505: disable RFP by domain [FF91+]
  * [NOTE] Working examples: "arkenfox.github.io", "*github.io"
  * Non-working examples: "https://arkenfox.github.io", "github.io", "*arkenfox.github.io" ***/
    // user_pref("privacy.resistFingerprinting.exemptedDomains", "*.example.invalid");
 /* 4520: disable WebGL (Web Graphics Library) ***/
    user_pref("webgl.disabled", true);
 
 /* 5009: disable "open with" in download dialog [FF50+]
  * Application data isolation [1]
  * [1] https://bugzilla.mozilla.org/1281959 ***/
    user_pref("browser.download.forbid_open_with", true);
 /* 5010: disable location bar suggestion types
  * [SETTING] Search>Address Bar>When using the address bar, suggest ***/
    user_pref("browser.urlbar.suggest.history", false);
    user_pref("browser.urlbar.suggest.bookmark", false);
    user_pref("browser.urlbar.suggest.openpage", false);
    user_pref("browser.urlbar.suggest.topsites", false); // [FF78+]
 /* 5011: disable location bar dropdown
  * This value controls the total number of entries to appear in the location bar dropdown ***/
    user_pref("browser.urlbar.maxRichResults", 0);
 /* 5012: disable location bar autofill
  * [1] https://support.mozilla.org/kb/address-bar-autocomplete-firefox#w_url-autocomplete ***/
    user_pref("browser.urlbar.autoFill", false);
 /* 5013: disable browsing and download history
  * [NOTE] We also clear history and downloads on exit (2811+)
  * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
    user_pref("places.history.enabled", false);
 /* 5016: discourage downloading to desktop
  * 0=desktop, 1=downloads (default), 2=custom
  * [SETTING] To set your custom default "downloads": General>Downloads>Save files to ***/
    user_pref("browser.download.folderList", 2);
 /* 5017: disable Form Autofill
  * If .supportedCountries includes your region (browser.search.region) and .supported
  * is "detect" (default), then the UI will show. Stored data is not secure, uses JSON
  * [SETTING] Privacy & Security>Forms and Autofill>Autofill addresses
  * [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill ***/
    user_pref("extensions.formautofill.addresses.enabled", false); // [FF55+]
    user_pref("extensions.formautofill.creditCards.enabled", false); // [FF56+]
 /* 5018: limit events that can cause a pop-up ***/
    user_pref("dom.popup_allowed_events", "click dblclick mousedown pointerdown");
 /* 5019: disable page thumbnail collection ***/
    user_pref("browser.pagethumbnails.capturing_disabled", true); // [HIDDEN PREF]
 /* 5021: disable location bar using search
  * Don't leak URL typos to a search engine, give an error message instead
  * Examples: "secretplace,com", "secretplace/com", "secretplace com", "secret place.com"
  * [NOTE] This does not affect explicit user action such as using search buttons in the
  * dropdown, or using keyword search shortcuts you configure in options (e.g. "d" for DuckDuckGo) ***/
    user_pref("keyword.enabled", false);
 
 /*** [SECTION 5500]: OPTIONAL HARDENING
    Not recommended. Overriding these can cause breakage and performance issues,
    they are mostly fingerprintable, and the threat model is practically nonexistent
 ***/
 /* 5505: disable Ion and baseline JIT to harden against JS exploits [RESTART]
  * [NOTE] When both Ion and JIT are disabled, and trustedprincipals
  * is enabled, then Ion can still be used by extensions (1599226)
  * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=firefox+jit
  * [2] https://microsoftedge.github.io/edgevr/posts/Super-Duper-Secure-Mode/ ***/
    user_pref("javascript.options.ion", false);
    user_pref("javascript.options.baselinejit", false);
    // user_pref("javascript.options.jit_trustedprincipals", true); // [FF75+] [HIDDEN PREF]
 /* 5506: disable WebAssembly [FF52+]
  * Vulnerabilities [1] have increasingly been found, including those known and fixed
  * in native programs years ago [2]. WASM has powerful low-level access, making
  * certain attacks (brute-force) and vulnerabilities more possible
  * [STATS] ~0.2% of websites, about half of which are for cryptomining / malvertising [2][3]
  * [1] https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=wasm
  * [2] https://spectrum.ieee.org/tech-talk/telecom/security/more-worries-over-the-security-of-web-assembly
  * [3] https://www.zdnet.com/article/half-of-the-websites-using-webassembly-use-it-for-malicious-purposes ***/
    user_pref("javascript.options.wasm", false);
 /* 5507: disable rendering of SVG OpenType fonts ***/
    // user_pref("gfx.font_rendering.opentype_svg.enabled", false);
 /* 5508: disable all DRM content (EME: Encryption Media Extension)
  * Optionally hide the UI setting which also disables the DRM prompt
  * [SETTING] General>DRM Content>Play DRM-controlled content
  * [TEST] https://bitmovin.com/demos/drm
  * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
    // user_pref("media.eme.enabled", false);
    // user_pref("browser.eme.ui.enabled", false);
 /* 5510: control when to send a cross-origin referer
  * 0=always (default), 1=only if base domains match, 2=only if hosts match
  * [NOTE] Will cause breakage: older modems/routers and some sites e.g banks, vimeo, icloud, instagram ***/
    // user_pref("network.http.referer.XOriginPolicy", 2);
 /* 5511: set DoH bootstrap address [FF89+]
  * Firefox uses the system DNS to initially resolve the IP address of your DoH server.
  * When set to a valid, working value that matches your "network.trr.uri" (0712) Firefox
  * won't use the system DNS. If the IP doesn't match then DoH won't work ***/
    // user_pref("network.trr.bootstrapAddr", "10.0.0.1"); // [HIDDEN PREF]
 
 /*** [SECTION 7000]: DON'T BOTHER ***/
 user_pref("_user.js.parrot", "7000 syntax error: the parrot's pushing up daisies!");
 /* 7001: disable APIs
  * Location-Aware Browsing, Full Screen
  * [WHY] The API state is easily fingerprintable.
  * Geo is behind a prompt (7002). Full screen requires user interaction ***/
    // user_pref("geo.enabled", false);
    // user_pref("full-screen-api.enabled", false);
 /* 7002: set default permissions
  * Location, Camera, Microphone, Notifications [FF58+] Virtual Reality [FF73+]
  * 0=always ask (default), 1=allow, 2=block
  * [WHY] These are fingerprintable via Permissions API, except VR. Just add site
  * exceptions as allow/block for frequently visited/annoying sites: i.e. not global
  * [SETTING] to add site exceptions: Ctrl+I>Permissions>
  * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Settings ***/
    // user_pref("permissions.default.geo", 0);
    // user_pref("permissions.default.camera", 0);
    // user_pref("permissions.default.microphone", 0);
    // user_pref("permissions.default.desktop-notification", 0);
    // user_pref("permissions.default.xr", 0); // Virtual Reality
 /* 7003: disable non-modern cipher suites [1]
  * [WHY] Passive fingerprinting. Minimal/non-existent threat of downgrade attacks
  * [1] https://browserleaks.com/ssl ***/
    // user_pref("security.ssl3.ecdhe_ecdsa_aes_128_sha", false);
    // user_pref("security.ssl3.ecdhe_ecdsa_aes_256_sha", false);
    // user_pref("security.ssl3.ecdhe_rsa_aes_128_sha", false);
    // user_pref("security.ssl3.ecdhe_rsa_aes_256_sha", false);
    // user_pref("security.ssl3.rsa_aes_128_gcm_sha256", false); // no PFS
    // user_pref("security.ssl3.rsa_aes_256_gcm_sha384", false); // no PFS
    // user_pref("security.ssl3.rsa_aes_128_sha", false); // no PFS
    // user_pref("security.ssl3.rsa_aes_256_sha", false); // no PFS
 /* 7004: control TLS versions
  * [WHY] Passive fingerprinting and security ***/
    // user_pref("security.tls.version.min", 3); // [DEFAULT: 3]
    // user_pref("security.tls.version.max", 4);
 /* 7005: disable SSL session IDs [FF36+]
  * [WHY] Passive fingerprinting and perf costs. These are session-only
  * and isolated with network partitioning (FF85+) and/or containers ***/
    // user_pref("security.ssl.disable_session_identifiers", true);
 /* 7007: referers
  * [WHY] Only cross-origin referers (1602, 5510) matter ***/
    // user_pref("network.http.sendRefererHeader", 2);
    // user_pref("network.http.referer.trimmingPolicy", 0);
 /* 7008: set the default Referrer Policy [FF59+]
  * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
  * [WHY] Defaults are fine. They can be overridden by a site-controlled Referrer Policy ***/
    // user_pref("network.http.referer.defaultPolicy", 2); // [DEFAULT: 2]
    // user_pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]
 /* 7010: disable HTTP Alternative Services [FF37+]
  * [WHY] Already isolated with network partitioning (FF85+) ***/
    // user_pref("network.http.altsvc.enabled", false);
 /* 7011: disable website control over browser right-click context menu
  * [WHY] Just use Shift-Right-Click ***/
    // user_pref("dom.event.contextmenu.enabled", false);
 /* 7012: disable icon fonts (glyphs) and local fallback rendering
  * [WHY] Breakage, font fallback is equivalency, also RFP
  * [1] https://bugzilla.mozilla.org/789788
  * [2] https://gitlab.torproject.org/legacy/trac/-/issues/8455 ***/
    // user_pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
    // user_pref("gfx.downloadable_fonts.fallback_delay", -1);
 /* 7013: disable Clipboard API
  * [WHY] Fingerprintable. Breakage. Cut/copy/paste require user
  * interaction, and paste is limited to focused editable fields ***/
    // user_pref("dom.event.clipboardevents.enabled", false);
 /* 7016: customize ETP settings
  * [NOTE] FPP (fingerprintingProtection) is ignored when RFP (4501) is enabled
  * [WHY] Arkenfox only supports strict (2701) which sets these at runtime ***/
    // user_pref("network.cookie.cookieBehavior", 5); // [DEFAULT: 5]
    // user_pref("network.cookie.cookieBehavior.optInPartitioning", true); // [ETP FF132+]
    // user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true);
    // user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // [FF100+]
    // user_pref("privacy.bounceTrackingProtection.mode", 1); // [FF131+] [ETP FF133+]
    // user_pref("privacy.fingerprintingProtection", true); // [FF114+] [ETP FF119+]
    // user_pref("privacy.partition.network_state.ocsp_cache", true); // [DEFAULT: true]
    // user_pref("privacy.query_stripping.enabled", true); // [FF101+]
    // user_pref("privacy.trackingprotection.enabled", true);
    // user_pref("privacy.trackingprotection.socialtracking.enabled", true);
    // user_pref("privacy.trackingprotection.cryptomining.enabled", true); // [DEFAULT: true]
    // user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // [DEFAULT: true]
 /* 7017: disable service workers
  * [WHY] Already isolated with TCP (2701) behind a pref (2710) ***/
    // user_pref("dom.serviceWorkers.enabled", false);
 /* 7018: disable Web Notifications [FF22+]
  * [WHY] Web Notifications are behind a prompt (7002)
  * [1] https://blog.mozilla.org/en/products/firefox/block-notification-requests/ ***/
    user_pref("dom.webnotifications.enabled", false);
 /* 7019: disable Push Notifications [FF44+]
  * [WHY] Website "push" requires subscription, and the API is required for CRLite (1224)
  * [NOTE] To remove all subscriptions, reset "dom.push.userAgentID"
  * [1] https://support.mozilla.org/kb/push-notifications-firefox ***/
    // user_pref("dom.push.enabled", false);
 /* 7020: disable WebRTC (Web Real-Time Communication)
  * [WHY] Firefox desktop uses mDNS hostname obfuscation and the private IP is never exposed until
  * required in TRUSTED scenarios; i.e. after you grant device (microphone or camera) access
  * [TEST] https://browserleaks.com/webrtc
  * [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
  * [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1 ***/
    // user_pref("media.peerconnection.enabled", false);
 /* 7021: enable GPC (Global Privacy Control) in non-PB windows
  * [WHY] Passive and active fingerprinting. Mostly redundant with Tracking Protection
  * in ETP Strict (2701) and sanitizing on close (2800s) ***/
    // user_pref("privacy.globalprivacycontrol.enabled", true);
 
 /*** [SECTION 8000]: DON'T BOTHER: FINGERPRINTING
    [WHY] They are insufficient to help anti-fingerprinting and do more harm than good
    [WARNING] DO NOT USE with RFP. RFP already covers these and they can interfere
 ***/
 user_pref("_user.js.parrot", "8000 syntax error: the parrot's crossed the Jordan");
 /* 8001: prefsCleaner: reset items useless for anti-fingerprinting ***/
    // user_pref("browser.display.use_document_fonts", "");
    // user_pref("browser.zoom.siteSpecific", "");
    // user_pref("device.sensors.enabled", "");
    // user_pref("dom.enable_performance", "");
    // user_pref("dom.enable_resource_timing", "");
    // user_pref("dom.gamepad.enabled", "");
    // user_pref("dom.maxHardwareConcurrency", "");
    // user_pref("dom.w3c_touch_events.enabled", "");
    // user_pref("dom.webaudio.enabled", "");
    // user_pref("font.system.whitelist", "");
    // user_pref("general.appname.override", "");
    // user_pref("general.appversion.override", "");
    // user_pref("general.buildID.override", "");
    // user_pref("general.oscpu.override", "");
    // user_pref("general.platform.override", "");
    // user_pref("general.useragent.override", "");
    // user_pref("media.navigator.enabled", "");
    // user_pref("media.ondevicechange.enabled", "");
    // user_pref("media.video_stats.enabled", "");
    // user_pref("media.webspeech.synth.enabled", "");
    // user_pref("ui.use_standins_for_native_colors", "");
    // user_pref("webgl.enable-debug-renderer-info", "");
 
 /*** [SECTION 8500]: TELEMETRY
    Arkenfox does not consider Firefox telemetry to be a privacy or security concern - comments below.
    But since most arkenfox users prefer it disabled, we'll do that rather than cause overrides.
 
    Opt-out
    - Telemetry is essential: a browser engine is a _very_ large complex beast costing billions to maintain
    - Opt-in telemetry _does not_ work and results in data that is unrepresentative and may be misleading
    Choice
    - Every new profile on first use provides data collection/use policy and the abillty to opt-out
    - It can be disabled at any time (Settings>Privacy & Security>Data Collection and Use) 
    Data
    - no PII (Personally Identifiable Information)
    - can be viewed in about:telemetry
    - uses Prio [1][2][3], Glean [4], Oblivious HTTP [5][6]
 
    [1] https://crypto.stanford.edu/prio/
    [2] https://hacks.mozilla.org/2018/10/testing-privacy-preserving-telemetry-with-prio/
    [3] https://blog.mozilla.org/security/2019/06/06/next-steps-in-privacy-preserving-telemetry-with-prio/
    [4] https://firefox-source-docs.mozilla.org/toolkit/components/glean/index.html
    [5] https://firefox-source-docs.mozilla.org/toolkit/components/glean/user/ohttp.html
    [6] https://blog.mozilla.org/en/tag/oblivious-http/
 ***/
 user_pref("_user.js.parrot", "8500 syntax error: the parrot's off the twig!");
 /* 8500: disable new data submission [FF41+]
  * If disabled, no policy is shown or upload takes place, ever
  * [1] https://bugzilla.mozilla.org/1195552 ***/
 user_pref("datareporting.policy.dataSubmissionEnabled", false);
 /* 8501: disable Health Reports
  * [SETTING] Privacy & Security>Firefox Data Collection and Use>Send technical... data ***/
 user_pref("datareporting.healthreport.uploadEnabled", false);
 /* 0802: disable telemetry
  * The "unified" pref affects the behavior of the "enabled" pref
  * - If "unified" is false then "enabled" controls the telemetry module
  * - If "unified" is true then "enabled" only controls whether to record extended data
  * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
  * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
  * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
 user_pref("toolkit.telemetry.unified", false);
 user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
 user_pref("toolkit.telemetry.server", "data:,");
 user_pref("toolkit.telemetry.archive.enabled", false);
 user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
 user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
 user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
 /* 8503: disable Telemetry Coverage
  * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
 user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
 user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
 user_pref("toolkit.coverage.endpoint.base", "");
 
 /*** [SECTION 9000]: NON-PROJECT RELATED ***/
 user_pref("_user.js.parrot", "9000 syntax error: the parrot's cashed in 'is chips!");
 /* 9001: disable welcome notices ***/
 user_pref("browser.startup.homepage_override.mstone", "ignore"); // [HIDDEN PREF]
 /* 9002: disable General>Browsing>Recommend extensions/features as you browse [FF67+] ***/
 user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
 user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
 /* 9004: disable search terms [FF110+]
  * [SETTING] Search>Search Bar>Use the address bar for search and navigation>Show search terms instead of URL... ***/
 user_pref("browser.urlbar.showSearchTerms.enabled", false);
 
 /*** [SECTION 9999]: DEPRECATED / RENAMED ***/
 user_pref("_user.js.parrot", "9999 syntax error: the parrot's shuffled off 'is mortal coil!");
 /* ESR128.x still uses all the following prefs
 // [NOTE] replace the * with a slash in the line above to re-enable active ones
 // FF132
 /* 2617: remove webchannel whitelist
    // [-] https://bugzilla.mozilla.org/1275612
    // user_pref("webchannel.allowObject.urlWhitelist", "");
 // ***/
 
 /* END: internal custom pref to test for syntax errors ***/
 user_pref("_user.js.parrot", "SUCCESS: No no he's not dead, he's, he's restin'!");

// Startup page
user_pref("browser.startup.page", 3); // Always resume the previous browser session

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