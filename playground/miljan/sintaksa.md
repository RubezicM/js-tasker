## Komande

- **[$]** - Dollar znak je odabran kao inicijator(prefiks) komande koja zahteva upotrebu parsera.Nakon [$] znaka sledi komanda, kojom govorimo programu koju operaciju da izvrsi.

 *Primer 1:*

```javascript
var $a = $num;
```

- [$] je iskoriscen da inicira variablu "a", pa joj nas parser dodeljuje ime iz globalnog objekta (alpha). Iskoristili smo komandu "$num", kojom nam parser daje nasumice odabran broj u unapred definisanom opsegu.

*Izlaz parsera :*

```javascript
var alpha = 13;
```

<hr></hr>

*Primer 2:*

```javascript
var $a_ºN = $num;
```

- **[º]** -- Ovaj znak je odabran kao prefiks za klasifikaciju tipa podataka. Obicno se nadovezuje nakon komandi iniciranim ($) - dollar znakom. Sluzi nam da tagujemo variablu u zavisnosti od toga koji tip podataka je njena vrednost. Jedna variabla moze imati vise tagova (primer: broj i objektni kljuc). Ovaj znak koristimo da pozovemo tip podataka koji zelimo u parseru.

  ​	

  - Neki od tagova i tipova podataka sa kojima cemo raditi su :

  ​        "N : Number",

  ​        "O : Object",

  ​        "S : String",

  ​        "B : Boolean",

  ​        "F : Funkcija",

  ​        "K : ObjectKey"

  

- Variabli "$a", dodeljena je klasifikacija N - (number), i mozemo joj pristupiti po imenu variable ili tipu podatka. Vise o ovome u segmentu "Klasifikacija i sortiranje variabli i podataka". 

*Izlaz parsera:*

```javascript
var alpha = 13;
```



<hr>

*Primer 3:*

```javascript
var $a = $num; 
var $b = $num;
    function $c(){
        $a = $num;
	};
$c();

console.log($a);
```

- Nakon inicijacije variabli "a" i "b", pravimo funkciju pod kljucem "c". Pozivamo funkciju komandom "$c()" - Ovo govori programu da pozove funkciju koja je snimljena pod kljucem "c". Logujemo vrednost variable "a", odnosno alpha,  upotrebom console.log(); 

*Izlaz parsera :*

```javascript
var alpha = 12;
var beta = 4;
	function theta(){
		alpha = 3
	}
theta();
console.log(alpha) // 3
```



<hr>

*Primer 4:*

```javascript
var $rnd_ºN = $num;
var $rnd_ºS = $str;
var $a = $num;
var $b = $used_ºN + $a;
 console.log($b);
```

   

* **[º]** -- Ovaj znak je odabran kao prefiks za klasifikaciju tipa podataka. Obicno se nadovezuje nakon komandi iniciranim ($) - dollar znakom. Sluzi nam da tagujemo variablu u zavisnosti od toga koji tip podataka je njena vrednost. Jedna variabla moze imati vise tagova (primer: broj i objektni kljuc). Ovaj znak koristimo da pozovemo tip podataka koji zelimo u parseru.

- **[$rnd_ºN]** -- Iniciramo nove variable. Program im dodeljuje imena koja jos uvek nisu iskoriscena. Jednoj je dodeljena nasumicna brojcana vrednost = ["N"], drugoj nasumican string = ["S"]. Sledece je inicijacija variable pod kljucem "a", i program joj dodeljuje ime koje joj pripada pod tim kljucem u objektu variabli. (u ovom slucaju to je "alpha"). 

- **[$used_ºN]** --Daje nam nasumicnu variablu koja je broj ["N"] koju smo iskoristili, tako sto bira izmedju dve (theta,alpha). Sve iskoriscene variable su sacuvane u globalnom objektu. Vise o tome u segmentu "Klasifikacija i sortiranje variabli"

*Izlaz parsera*

```javascript
var theta = 4;
var delta = "foo";
var alpha = 12;
var beta = theta + alpha;
console.log(beta) // 16
```

<hr>

*Primer 5:*

```javascript
var $a_ºO = {
	$rnd_ºKN:$num,
	$c_ºKN:$num,
	$h_ºFK:function(){
		$a.$c = $num;
	}
}
$a.$g.$h();
console.log($a.$c) 
```

- **[$a_ºO]** - dodeljeno je ime variable iz biblioteke pod kljucem ["*a*"] i tip podataka "Objekat". **[rnd_ºKN]** ovime deklarisemo nasumice odabrano ime variable i dodeljujemo mu tipove "Number" i "Kljuc objekta". **[$c_ºKN]** deklarisemo ime variable koje je u biblioteci pod kljucem ["*c*"], i dodeljujemo mu tipove "Number" i "Kljuc objekta".  **[$h_ºFK]** dodeljujemo variabli pod kljucem ["*h*"] tip "Funkcija". Kasnije pozivamo tu funkciju i logujemo rezultat izmene.

 *Izlaz parsera :*

```javascript
var alpha {
	zeta : 4,
	delta: 12,
	sigma:function(){
		alpha.delta = 7;
	}
}
alpha.gamma.sigma();
console.log(alpha.delta) // 7
```

<hr>

*Primer 6:*

```javascript
var $rnd_ºN = $num;
var $b_ºN = $num;
var $a_ºA  = [$num3];
var $c_ºA = [$used_ºNx2];
console.log($a.concat($c));
```

* **[$num3]** -- Ovom komandom govorimo parseru da napise 3 nasumice generisana broja. Komanda radi samo za nizove.
* **[$used_ºNx2]** -- Parser vraca 2 ["*x2*"] iskoriscene variable koje imaju tip podataka broj ["*N*"]. Takodje je karakteristicna za nizove samo.



Moguci izlaz parsera :

```javascript
var gamma = 11;

var beta = 13;

var etta = [3,6,15];

var alpha = [gamma,beta];

console.log(etta.concat(alpha));  // 3,6,15,11,13;
```

