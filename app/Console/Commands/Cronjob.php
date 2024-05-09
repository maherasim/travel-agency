<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\AlertsDefinition;
use App\Models\AlertCreation;
use App\Models\UserDetails;
use App\Mail\AlertMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use AfricasTalking\SDK\AfricasTalking;

function sendSMS($message){
      
    $username   = "bigglandlord";
    $apiKey     = "c643f71decf102019c6c8e35cd12fdbdd700475e9864d368ced82a879d908c93";
    
    // Initialize the SDK
    $AT         = new AfricasTalking($username, $apiKey);
    
    // Get the SMS service
    $sms        = $AT->sms();
    
    // Set the numbers you want to send to in international format]
    
    // $recipients = "+".$contact;
    $recipients = "+2349032240799";
    
    // Set your message
  
    // Set your shortCode or senderId
    $from       = "Bigglandlord";
    
    try {
        // Thats it, hit send and we'll take care of the rest
        $result = $sms->send([
            'to'      => $recipients,
            'message' => $message,
            'from'    => $from
        ]);
    
        print_r($result);
    } catch (Exception $e) {
        echo "Error: ".$e->getMessage();
    }
 }

class Cronjob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cronjob';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mail and SMS Cronjob';

    /**
     * Execute the console command.
     */

     

     public function handle()
     {
         // Fetch alerts that need to be processed
         $alerts = AlertCreation::where('priority', 'once')->get();
 
         // Process each alert
         foreach ($alerts as $alert) {
             // Check if the alert has already been sent
             $message = "Upcoming Birthday Cake Booking Reminder\n\nHello, {$alert->customer_name}\n\tWe wanted to remind you about your upcoming birthday cake booking with us. We hope you're looking forward to it!\n\n            
             Booking Details:{$alert->user->userDetails->business_name}\n\t-Provider Name:{$alert->user->userDetails->full_name} \n\t          
             If you have any questions or need to make any changes to your booking, please feel free to contact us:\n\n            
             Contact Information:\n\t- Phone:{$alert->user->userDetails->phone_number} \n\t- Email: {$alert->user->userDetails->email}\n\t            
             Thank you for choosing us for your birthday cake celebration. We look forward to serving you!
            ";
         

             if ($alert->is_remainder) {
                 // Send email
                 Mail::to('hasin240799@gmail.com')->send(new AlertMail($alert));
                 sendSMS($message);
 
                 // Update sent_time
                 $alert->mail_sent_time = Carbon::now();
                 $alert->save();
 
                 // Output the alert for debugging
                 $this->info('Processed Alert ID: ' . $alert->id);
             } elseif ($this->isSMSTime($alert->mail_sent_time, $alert->remainder_after_hours)) {
                 // Send SMS
                 sendSMS($message);
                 
                 // Output the alert for debugging
                 $this->info('Sent SMS for Alert ID: ' . $alert->id);
             } else {
                 // Log that the alert does not need to be sent at this time
                 $this->info('Alert ID: ' . $alert->id . ' does not need to be sent at this time.');
             }
         }
 
         // Log a message
         $this->info('Command executed successfully at ' . now());
     }
 
     /**
      * Check if the reminder time has elapsed since the last sent time.
      *
      * @param string $sentTime
      * @param int $reminderHours
      * @return bool
      */
     protected function isReminderTimeElapsed($sentTime, $reminderHours)
     {
         return Carbon::parse($sentTime)->addHours($reminderHours)->isPast();
     }
 
     /**
      * Check if it's time to send SMS based on sent time and reminder hours.
      *
      * @param string $sentTime
      * @param int $reminderHours
      * @return bool
      */
      protected function isSMSTime($sentTime, $reminderHours)
      {
          // Check if the reminder time has elapsed since the sent time
          return $this->isReminderTimeElapsed($sentTime, $reminderHours);
      }
      
 

    // public function handle()
    // {      
    //     // Fetch alerts that need to be processed
    //     // $alerts = AlertCreation::where('scheduled_at', '<=', now())
    //     //                ->where('priority', 'once') // Assuming you have a 'processed' column
    //     //                ->get();

    //      // Fetch alerts that need to be processed
    //     $alerts = AlertCreation::where('priority', 'once') // Assuming you have a 'processed' column
    //                    ->get();

    //     // Process each alert
    //     foreach ($alerts as $alert) {
    //         // Your logic to send mail or SMS for each alert
    //         // For example:
    //         Mail::to('hasin240799@gmail.com')->send(new AlertMail($alert));
        //     $message = "
        //     Upcoming Birthday Cake Booking Remainder            
        //     Hello             
        //     We wanted to remind you about your upcoming birthday cake booking with us. We hope you're looking forward to it!            
        //     Booking Details:
        //     - Provider Name: 
        //     - Booking Date:             
        //     If you have any questions or need to make any changes to your booking, please feel free to contact us:            
        //     Contact Information:
        //     - Phone: 
        //     - Email:             
        //     Thank you for choosing  for your birthday cake celebration. We look forward to serving you!
        // ";
        
    //     // Send SMS
    //     sendSMS($message);
            
    //         // SMS::send($alert->recipient_phone, $alert->message);
    //        echo $alert;
    //     }

    //     // Log a message
    //     $message = 'Command executed successfully at ' . now();
    //     $this->info($message);
    // }
}
