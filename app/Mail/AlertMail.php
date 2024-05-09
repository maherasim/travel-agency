<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\AlertCreation; // Import the AlertCreation model if not already imported

class AlertMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The alert instance.
     *
     * @var AlertCreation
     */
    public $alert;

    /**
     * Create a new message instance.
     *
     * @param  AlertCreation  $alert
     * @return void
     */
    public function __construct(AlertCreation $alert)
    {
        $this->alert = $alert;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('custom-notification')
                    ->with(['alert' => $this->alert]); // Pass the alert data to the view
    }
}
