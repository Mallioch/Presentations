jQuery(document).ready(function($) {
  Shadowbox.init({
    skipSetup: true
  });
  Shadowbox.setup(".rss_image a.gallery", {
    gallery:    "Feed Gallery"
  } );
  Shadowbox.setup(".rss_image a.site"); 
});
  