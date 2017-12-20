
# link

a simple and simple client side router

> Link (リンク Rinku?, Hylian LHylian IHylian NHylian K) is the main protagonist of the Legend of Zelda series. He is the everlasting hero of the setting, having appeared throughout the ages in a neverending line of incarnations. The various heroes who use the name of Link are courageous young boys or teenagers in green clothing who leave their homes to save the world from evil forces threatening it. Over the course of his adventure, Link defeats legions of evil monsters, explores vast lands, helps anyone he meets who is struggling, navigates deadly dungeons, and collects mythical items while pursuing his quest for justice and peace. In the end, he succeeds in his quest and becomes a legendary hero. He is considered an iconic character in video gaming and the very symbol of the Zelda franchise, and remains one of the most popular video game protagonists.

![link](https://vignette.wikia.nocookie.net/zelda/images/5/57/Breath_of_the_Wild_Artwork_Link_%28Official_Artwork%29.png/revision/latest?cb=20160623185226)

## Basic Use

```html
<ul>
  <li><a href="#/user">#/user</a></li>
  <li><a href="#/user/profile/12">#/user/profile/12</a></li>
  <li><a href="#/my?key=12345">#/my</a></li>
</ul>
<script src="../dist/link.js"></script>
<script>

  var routes = [{
    url: '/user',
    view: function() { console.log('user page') },
    sub: [{
      url: '/profile/:id',
      view: function(id) { console.log('user profile is ', id) }
    }]
  }, {
    url: '/my',
    view: function(params) { console.log(params) }
  }]

  new Link(routes)
</script>
```