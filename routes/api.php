<?php

use Illuminate\Http\Request;

Route::apiResource('/question' , 'QuestionController');
Route::get('/question/category/{id}' , 'QuestionController@QuestionsWithCategory');
Route::apiResource('/category' , 'CategoryController');
Route::apiResource('/question/{question}/reply' , 'ReplyController');

Route::post('/like/{reply}' , 'LikeController@likeIt');
Route::delete('/like/{reply}' , 'LikeController@unLikeIt');

Route::post('notifications' ,'NotificationsController@index');
Route::post('markAsRead' ,'NotificationsController@markAsRead');

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});