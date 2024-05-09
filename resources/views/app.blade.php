<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title inertia>{{ config('app.name', 'Biz Alert') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

                <!--     Fonts and icons     -->
        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700" />
        <!-- Nucleo Icons -->
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="//cdn.datatables.net/2.0.3/css/dataTables.dataTables.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.datatables.net/2.0.3/css/dataTables.dataTables.css" />
  
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />
        <!-- Font Awesome Icons -->
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
        <!-- Material Icons -->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
        <!-- CSS Files -->
        <link id="pagestyle" href="/assets/css/material-dashboard.css?v=3.0.0" rel="stylesheet" />
    

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap">
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="/assets/css/mdb.min.css">
      
        <link rel="stylesheet" href="/assets/css/style.css">
                <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">

        <!-- Icons -->
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet" />
        <link href="/assets/css/nucleo-svg.css" rel="stylesheet" />

        <!-- Font Awesome Icons -->
        <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <!-- CSS Files -->
        <link id="pagestyle" href="/assets/css/material-dashboard.css" rel="stylesheet" />
<style>
    .opcion-con-desplegable:hover .desplegable {
        display: block;
    }
</style>
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased g-sidenav-show  bg-gray-300">
        @inertia

        
                <!--   Core JS Files   -->
        <script src="/assets/js/core/popper.min.js"></script>
        <script src="/assets/js/core/bootstrap.min.js"></script>
        <script src="/assets/js/plugins/perfect-scrollbar.min.js"></script>
        <script src="/assets/js/plugins/smooth-scrollbar.min.js"></script>
        <script src="/assets/js/plugins/chartjs.min.js"></script>
        <script async defer src="https://buttons.github.io/buttons.js"></script>
  <!-- Control Center for Material Dashboard: parallax effects, scripts for the example pages etc -->
        <script src="/assets/js/material-dashboard.min.js"></script>

        <script>
            var win = navigator.platform.indexOf('Win') > -1;
            if (win && document.querySelector('#sidenav-scrollbar')) {
              var options = {
                damping: '0.5'
              }
              Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
            }
          </script>

        <!-- jQuery -->
        <script src="//cdn.datatables.net/2.0.3/js/dataTables.min.js"></script>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>
       
         <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
         <script src="https://unpkg.com/flowbite@1.3.4/dist/flowbite.js"></script>
         
         <script src="https://cdn.datatables.net/2.0.3/js/dataTables.js"></script>

         <script>
            document.addEventListener("DOMContentLoaded", function () {
              // Obtener todas las opciones principales con desplegables
              const opcionesConDesplegable = document.querySelectorAll(".opcion-con-desplegable");
        
              // Agregar evento de clic a cada opción principal
              opcionesConDesplegable.forEach(function (opcion) {
                opcion.addEventListener("click", function () {
                  // Obtener el desplegable asociado a la opción
                  const desplegable = opcion.querySelector(".desplegable");
        
                  // Alternar la clase "hidden" para mostrar u ocultar el desplegable
                  desplegable.classList.toggle("hidden");
                });
              });
            });
          </script>
         <script>
                
            $('#myTable').DataTable({
            responsive: true,
            layout: {
                top1: 'searchPanes'
            },
            language: {
                searchPanes: {
                    emptyPanes: 'There are no panes to display. :/'
                }
            }
        });
         </script>
        
    </body>
</html>
