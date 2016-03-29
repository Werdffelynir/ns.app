<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JavaScript Application</title>

    <link rel="stylesheet" href="../css/grid.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="../src/ns.application.js"></script>
    <script src="js.app/init.js"></script>

</head>
<body>

<div id="app-tips"></div>
<div id="app-help"></div>
<div id="app-popup">
    <div id="app-popup-win">
        <div id="app-popup-top" class="tbl">
            <div class="tbl_cell">Title name</div>
            <div class="tbl_cell linker" data-id="popup_close">Close</div>
        </div>
        <div id="app-popup-content"></div>
        <div id="app-popup-bottom">
            <span class="btn linker" data-id="popup_ok">Ok</span>
            <span class="btn linker" data-id="popup_cancel">Cancel</span>
        </div>
    </div>
</div>

<div id="app-page" class="tbl">

    <div id="app-content" class="tbl_cell valign_top"></div>
    <div id="app-sidebar" class="tbl_cell valign_top"></div>

</div>

</body>
</html>

