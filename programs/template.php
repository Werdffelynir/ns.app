<?php

class template {

  private $sapi = null;
  private $command = null;
  private $options = [];

  public function __construct($sapi, $command, $options){
    $this->sapi = $sapi;
    $this->program = $command;
    $this->command = $options;
    $this->init();
  }

  public function init(){


  }



}