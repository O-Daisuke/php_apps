        google.load("feeds", "1");
                
        function rssRead() {
           var $count = document.getElementById('count').value;
           for($i=0; $i < $count; $i++){
               var url = document.getElementById('url-'+$i).value;
               //console.log("url:"+url);

               var feed = new google.feeds.Feed(url);
               feed.setNumEntries(10);
               feed.includeHistoricalEntries();
               
               feed.load(function(result) {
                  if (!result.error) {
                　　 console.log(result);
                    var container = document.getElementById('table');
                    for (var $j = 0; $j < result.feed.entries.length; $j++) {
                        var entry = result.feed.entries[$j];

                        var link = document.createElement("a");
                        link.href = entry.link;
                        link.appendChild(document.createTextNode(entry.title));
                        
                        var td3 = document.createElement("td");
                        td3.appendChild(link);
                        
                        var title = result.feed.title;
                        var td2 = document.createElement("td");
                        td2.appendChild(document.createTextNode(title));

                        var td1 = document.createElement("td");
                        var checkBox = document.createElement("input");
                        checkBox.type = "checkBox";
                        checkBox.id = "lifehackerBtn_"+ $j;
                        checkBox.onclick = "checkedBox()";
                        td1.appendChild(checkBox);
                        
                        var tr = document.createElement("tr");                        
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        container.appendChild(tr);
                        
                        //ajax で entry.link + entry.titleをDB保存
                    }
                  }else{
                       console.log("error:"+result.error);
                  } 
               });
            }
        }
        
        google.setOnLoadCallback(rssRead);
        
        function insertRss(){
            var nameVal = document.getElementById('name_create').value;
            var urlVal = document.getElementById('url_create').value;
        
            document.getElementById('NAME').value= nameVal;
            document.getElementById('URL').value= urlVal;
            
            var obj = document.forms['form'];
            obj.method = 'get';
            obj.action = './insertRss.php';
            obj.submit();
        }
        
        function deleteRss(id){
            if(!id){
               return false;
            }
            if(confirm('削除しても宜しいですか？')){
            document.getElementById('ID').value= id;     
            var obj = document.forms['form'];
            obj.method = 'get';
            obj.action = './deleteRss.php';
            obj.submit();
            }
        }
       
        function search(){
        	console.log('Click');
          google.load("feeds", "1");
          function initialize() {
            var title = "ドットインストール";
            google.feeds.findFeeds(title, function(result) {
                if (!result.error) {
                    console.log(result.entries[0].url);
                }
            });
          }
          google.setOnLoadCallback(initialize);
        }
        
        
        function checked(){
            
        }
