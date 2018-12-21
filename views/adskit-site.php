<?php
$view->script('adskit-site', 'lemariva/adsensekit:app/bundle/adskit-site.js', ['vue','lodash']);
?>
<?php //echo $type;  echo $id; ?>
<p></p>

<?php if ($type == 0): ?>
  
  <div class="adsensekit adsense" data-id=<?php echo $id;?>>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <adsensekit :ad-item=aditem
      :ad-style="display: block"
      :ad-format=aditem.adformat_adsense
      :ad-layout-key=aditem.adlayoutkey_adsense
      :ad-client=aditem.adclient_adsense
      :ad-slot=aditem.adslot_adsense>
    </adsensekit>
  </div>

<?php elseif ($type == 1): ?>
  
  <div class="adsensekit adimg" data-id=<?php echo $id;?>>
    <adsensekit :ad-item=aditem :ad-src=aditem.adsrc_img :ad-url=aditem.adurl_img :ad-name=aditem.slug></adsensekit>
  </div>

<?php endif;?>

<p></p>