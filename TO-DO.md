# Miljan 

 * 10.02.2019

    - Ispravka array metoda, ispravka bugova

    TO-DO * 
        
        - Objekti i pozivi objekata, smisljanje sintakse za to.. testiranje na bugove

 * 11.02.2019

    - U razmatranju promena sintakse za gradnju nizova : 

        - stara : 

            var $a_ºA = [];
            var $rnd_ºN = $num;
            var $rnd_ºN = $num;
            var $rnd_ºN = $num;
            var $b_ºA = [];
            var $c_ºA = [$arr_ºN_used1,$arr_ºN_new2]; // Koriscen keyword $arr, pa tip, pa uslov
            var $d = [$arr_ºN_used2];
            $c.push($d);
            console.log($c);
        
        - nova : 

          var $rnd_ºN = $num;
          var $rnd_ºN = $num;
          var $b_ºA = [$used_ºN2]; // Umesto keyword $arr, sada poziv ide bez.. Ide uslov pa tip pa kolicina variabli.
          var $g_ºA = ["str","foo",23];
          var $h_ºA = [$num2,$used_ºN2]; // radi kombinovanje variabli i brojeva
          var $c_ºA = [$num4]; // dodat poziv za brojeve, umesto "new" uslova, posle standardnog poziva za random broj ide kolicina brojeva.
          $var $k_ºN = $num;
          $var $used_ºN = $num;
          console.log($b[0],$c[2]);

    Trenutno funckionise samo nova sintaksa;


    - Razmatranje "var" reci, da li cemo je menjati iz inline ili komentara.. trenutno rade obe opcije. Primer: 

        - var $a_ºN = $num;
          var $used_ºN = $num; // var
          $var $used_ºN = $num;

        Meni se vise svidja inline, kraca je i nema ponavljanja

# Stefan





# Global

