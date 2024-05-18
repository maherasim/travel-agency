<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\AlertController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\UserDetails;

use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/landing', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard',[AlertController::class,'Dashboard'])->middleware(['auth'])->name('dashboard');





Route::middleware('auth')->group(function () {
    //client register
    Route::get('/client/register', [ClientController::class, 'create'])->name('client.index');
    Route::post('/client/register', [ClientController::class, 'store'])->name('client.register.store');
    //client list record retrieve
    Route::get('/client/create', [ClientController::class, 'clientList'])->name('client.list.create');
    Route::get('/client/list', [ClientController::class, 'clientListIndex'])->name('client.list.index');
    Route::post('/client/update', [ClientController::class, 'clientUpdateStore'])->name('client.update.store');
    Route::get('/client/{id}/update', [ClientController::class, 'clientUpdateIndex'])
    ->where('id', '[0-9]+') // Only allow numeric IDs
    ->name('client.update.index');
    Route::delete('/client/delete', [ClientController::class, 'destroy'])->name('client.destroy');
    Route::get('/total-clients', [ClientController::class, 'totalClients']);
    Route::get('/stats', [ClientController::class, 'stats'])->name('stats');
});

     Route::get('/que/fetch/create', [VendorController::class, 'view']);



    Route::get('/services/edit/{id}', [VendorController::class, 'edit'])->name('vendor.edit');

    Route::get('/services/form', [ServiceController::class, 'index'])->name('services.index');

    Route::get('/services/fetch/create', [VendorController::class, 'vendorListfetch']);
    Route::get('/services/fetch/admin', [VendorController::class, 'vendorListfetchadmin']);
    Route::get('/services/fetch/client', [VendorController::class, 'vendorListfetchclient']);


    Route::post('/service/update/status', [ServiceController::class, 'updateStatus']);

 
    


Route::get('/backview',function(){
    return view('backview');
    });

Route::get('/invoice',function(){
    return view('invoice');
    });
    Route::get('/vocher',function(){
        return view('vocher');
        });





    Route::get('/services/form/fetch', [VendorController::class, 'fetchListIndex']);
    Route::get('/services/form/fetch/admin', [VendorController::class, 'fetchListIndexadmin'])->name('fetch.admin');
    Route::get('/vendor/{id}/edit', [VendorController::class, 'edit'])->name('vendor.edit');
    Route::post('/vendor/serviceupdae', [VendorController::class, 'update'])->name('vendor.update');


    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::post('/services/preview', [ServiceController::class, 'preview'])->name('services.preview');

    Route::get('/services/back', [ServiceController::class, 'back'])->name('services.back');
    Route::delete('/services/delete', [ServiceController::class, 'destroy'])->name('service.destroy');
    Route::post('/qoutation/update/status', [VendorController::class, 'updateStatus']);




    Route::get('/quotation/form/fetch', [QuotationController::class, 'index'])->name('quotation.index');
    Route::post('/quotation/form/store', [QuotationController::class, 'store'])->name('quotation.store');
    Route::get('/quotation/form/fetch/admin', [QuotationController::class, 'fetchListIndexadmin'])->name('quotation.fetch.admin');
    Route::get('/quotation/fetch/admin/ ', [QuotationController::class, 'quationListfetchadmin']);
    Route::get('/quo/fetch/admin', [QuotationController::class, 'quaListfetchadmin']);

    Route::get('/quo/fetch/hotel', [QuotationController::class, 'quationListfetchhotel']);


    Route::get('/quotation/view/{id}', [QuotationController::class, 'view'])->name('quotation.view');
    Route::get('/quotation/view/hotel/{id}', [QuotationController::class, 'hotelview'])->name('quotation.hotelview');
    Route::get('/quotation/generate-pdf/{id}', [QuotationController::class, 'generatePdf'])->name('generatePdf');
    Route::get('/quotation/generate-invoice/{id}', [QuotationController::class, 'generateInvoice'])->name('generateInvoice');
    Route::delete('/quotation/delete', [QuotationController::class, 'destroy'])->name('quotation.destroy');
    Route::delete('/hotel/delete', [QuotationController::class, 'hoteldestroy'])->name('hotel.destroy');

    Route::get('/quotation/{id}/edit', [QuotationController::class, 'edit'])->name('quotation.edit');
    Route::get('/hotelquotation/{id}/edit', [QuotationController::class, 'hoteledit'])->name('quotation.hoteledit');

    Route::post('/quotation/quotationupdate', [QuotationController::class, 'update'])->name('quotation.update');
    Route::post('/hotel/quotationupdate', [QuotationController::class, 'hotelupdate'])->name('hotelquotation.update');


    Route::get('/ticketview/{id}',  [QuotationController::class, 'show']);
    Route::get('/voucherqou/{id}', [QuotationController::class, 'voucherqou']);



    Route::get('/quotation/form/hotel', [QuotationController::class, 'qoutationhotel'])->name('quotation.hotel');







    Route::name('razorpay.')
    ->controller(PaymentController::class)
    ->prefix('razorpay')
    ->group(function () {
        Route::view('payment', 'razorpay.index')->name('create.payment');
        Route::post('handle-payment', 'handlePayment')->name('make.payment');
    });




    Route::get('/ticket/form/fetch', [TicketController::class, 'index'])->name('ticket.index');
    Route::post('/ticket/store', [TicketController::class, 'store'])->name('ticket.store');

    Route::get('/invoice/form/fetch', [InvoiceController::class, 'index'])->name('invoice.index');
    Route::post('/invoice/store', [InvoiceController::class, 'store'])->name('invoice.store');

    Route::get('/payment', [PaymentController::class, 'showPaymentForm'])->name('payment');
    Route::post('/payment', [PaymentController::class, 'makePayment'])->name('payment.makePayment');
    Route::get('/payment/success', [PaymentController::class, 'paymentSuccess'])->name('payment.success');
    Route::get('/payment/failure', [PaymentController::class, 'paymentFailure'])->name('payment.failure');







    //vendor register
    Route::get('/vendor/register', [VendorController::class, 'create'])->name('vendor.index');
    Route::post('/vendor/register', [VendorController::class, 'store'])->name('vendor.register.store');

    // //vnedor list record retrieve
    Route::get('/vendor/create', [VendorController::class, 'vendorList'])->name('vendor.list.create');
    Route::get('/vendor/list', [VendorController::class, 'vendorListIndex'])->name('vendor.list.index');
    Route::post('/vendor/update', [VendorController::class, 'vendorUpdateStore'])->name('vendor.update.store');
    Route::get('/vendor/{id}/update', [VendorController::class, 'vendorUpdateIndex'])
    ->where('id', '[0-9]+') // Only allow numeric IDs
    ->name('vendor.update.index');
    Route::delete('/vendor/delete', [VendorController::class, 'destroy'])->name('vendor.destroy');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


require __DIR__.'/auth.php';
