<?php

class Admin
{
    public function beforeroute()
    {
        // check droits admin
    }

    public function afterroute()
    {
        echo Template::instance()->render('layout.html');
    }

    public function index(Base $f3)
    {
        $f3->set('inc', 'admin.htm');
    }
}
