<?php

require_once('./common/config.php');
require_once('./common/functions.php');

session_start();

$_SESSION = array();

session_destroy();

locationLogin();