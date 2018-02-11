<?php
$view->script('google-ads', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
$view->script('adskit-site', 'lemariva/adsensekit:app/bundle/adskit-site.js', ['vue','google-ads']);
?>

<div id="adsensekit">
  <adsensekit :ad-item=aditem
    :ad-style="display: block"
    :ad-format=aditem.adformat
    :ad-layout-key=aditem.adlayoutkey
    :ad-client=aditem.adclient
    :ad-slot=aditem.adslot
    >
  </adsensekit>
</div>
