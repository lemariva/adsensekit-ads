<?php
//$view->script('google-ads', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
$view->script('adskit-site', 'lemariva/adsensekit:app/bundle/adskit-site.js', ['vue','lodash']);
?>

<div class="adsensekit" data-id=<?php echo $id;?>>
  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
  <adsensekit :ad-item=aditem
    :ad-style="display: block"
    :ad-format=aditem.adformat
    :ad-layout-key=aditem.adlayoutkey
    :ad-client=aditem.adclient
    :ad-slot=aditem.adslot>
  </adsensekit>
</div>
