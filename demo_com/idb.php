<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Quick Data</title>
    <script src="js/idb0.0.1.js"></script>
    <style rel="stylesheet">
        html, body{
            padding: 0;
            margin: 0;
            background-color: #1f1f1f;
            color: #C8C8C8;
            font-family: Arial, serif;
            font-size: 13px;
        }
        #page{
            width: 800px;
            margin: 0 auto;
        }
        #header{}
        #content{}
        #footer{}

        .qd_result{
            margin: 20px 0;
            border: 1px  solid #8d9000;
            background-color: #4E4E4E;
            color: #c9ea3e;
        }

        .qd_list{
            -webkit-columns: 3 200px;
            -moz-columns: 3 200px;
            columns: 3 200px;
            /*-webkit-column-gap: 2em;*/
            /*-moz-column-gap: 2em;*/
            /*column-gap: 2em;*/
        }
        .qd_btn{
            display: inline-block;
            padding: 3px 10px;
            line-height: 24px;
            border: 1px  solid #8d9000;
            background-color: #242424;
            color: #c9ea3e;
        }
        .qd_item{
            margin: 2px 0;
        }
        .qd_field{
            display: inline-block;
            padding: 1px 10px;
            width: 38%;
            line-height: 14px;
            background-color: #4E4E4E;
        }
        .qd_result{
            display: block;
            padding: 10px;
            width: 100%;
            font-family: cursive, monospace, "Ubuntu Mono";
        }

    </style>
</head>
<body>
<div id="page">
    <div id="header"></div>
    <div id="content">

        <div class="qd_btn qd_create">Create field</div>
        <div class="qd_btn qd_gen">Generate</div>

        <div class="qd_list">
            <div class="qd_item">
                <div class="qd_field qd_name" contenteditable="true">key</div>
                <div class="qd_field qd_value" contenteditable="true">value</div>
            </div>
        </div>
        <pre class="qd_result"></pre>
    </div>
    <div id="footer"></div>
</div>


<script>

    var qdList = document.querySelector('.qd_list');
    var qdCreate = document.querySelector('.qd_create');
    var qdGen = document.querySelector('.qd_gen');
    var qdResult = document.querySelector('.qd_result');
    var data = [];
    var dataString = '';
    var iterator = 1;

    qdCreate.onclick = function(event){
        createFields();
    };
    qdGen.onclick = function(event){
        data = [];
        readFields();
        dataString = JSON.stringify(data, null, ' ');
        qdResult.innerHTML = dataString;
    };

    function createFields(){
        var item = document.querySelector('.qd_item'),
            newItem = item.cloneNode(true);
        newItem.querySelector('.qd_name').textContent = 'key'+ (++iterator);
        newItem.querySelector('.qd_value').textContent = 'value'+ (iterator);
        qdList.appendChild(newItem);
    }
    function readFields(){
        var key, name, value, item = document.querySelectorAll('.qd_item');
        for (key in item ){
            var elem = item[key];
            if(typeof elem === 'object' && elem.nodeType === Node.ELEMENT_NODE){
                name = elem.querySelector('.qd_name').textContent.trim();
                value = elem.querySelector('.qd_value').textContent.trim();
                console.log(name, value);
                data.push(JSON.parse('{"'+name+'":"value"}'));
            }
        }
    }

</script>
</body>
</html>