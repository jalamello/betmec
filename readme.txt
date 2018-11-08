BetMec  applikaatio

1. Kuvaus
---------

Applikaatioon tallenetaan urheiluvetoja joiden pohjalta voidaan analysoida minkä tyyppiset vedot ovat olleet kannattavimpia.

Ulkopuoliset käyttäjät voivat rekisteröityä järjestelmään ja katsella näitä tietoja. Lisäksi he voivat valita heidän kiinnostuksensa 
kohteet (vedonlyöntitoimisto, urheilulaji, vetomuoto) jonka pohjalta he voivat tilata itselleen vedonlyöntivihjeitä.

Asetetut vedot syötetään järjestelmään toisesta java-applikaatiosta REST API rajapinnan kautta. Vedon tulos syötetään järjestelmään käyttöliittymän kautta.

Kun käyttäjä on kirjautunut sisään avautuu NavBar, jossa on vaihtoehdot Bets, My Bookies, My sports, My bet types
2. Teknologiakuvaus 
-------------------
Käytetyt teknologiat MongoDB, Node, React, Express, Mongoose, java, JFreeChart, React native
NetBeans JFreeChart, NBM,ongo

3. Ominaisuuskartoitus
----------------------
Applikaatiossa tulee olla seuraavat APIt

 - Admin API, jonka kautta pystytään syöttämään järjestelmään uusia vetoja, sekä editoimaan niitä (kaikkien tietojen osalta)
 - User API, jonka kautta käyttäjä voi valita häntä kiinnostavat urheilulajit, vedonlyöntitoimistot, vetotyypit. Käyttäjä voi 
	halutessaan tilata vihjeitä notifikkaatioina sekä tarkastella miten hänellle lähetetyt vihjeet olisivat tuottaneet.

4. REST API kuvaus
------------------
GET    /api/register	register user
GET    /api/login       user login
GET    /api/logout      uesr logout
GET    /api/bets        get last 100 bets
POST   /api/bets      	insert new bet
DELETE /api/bets/:id    delete a bet by id
POST   /api/bets/:id    edit a bet by id

5. Tietokannan rakenne
----------------------
{
	"eventdate" : date 		31.10.2018 22:45  Date and time when event starts (UTC)
	"sprtsid"   : numeric 	1 =soccer, 2tennis, 3=ice hockey, 4=basket, 5=Am.football, 6=handball, 7= , 8=volley
	"country"   : string 	England        
	"league"    : string		EFL Cup /2019      
	"hometeam"  : string   	West Ham United      
	"awayteam"  : string		Tottenham Hotspur
    "bettype"   : string		1X2 / Ord Time   
	"bookie"    : string		Coolbe 	
	"betchoice" : string		Home
	"stake"     : numeric	5.00 
	"odds"      : numeric  	3.35 
	"ev"	    : numeric	1.0421 
	"result"    : string     Away          		// entered manually
	"winnings"  : numeric    0.00 				// calculated automatically after "result" been entered
	"saldo"     : numeric    2753.35             //     -"-                                             (cumulative)
	}

6. Luokkakaaviot ja sekvenssikaaviot React frontendiin
------------------------------------------------------
https://en.wikipedia.org/wiki/Class_diagram

7. Koko applikaation Käyttötapaukset ja sekvenssikaaviot
--------------------------------------------------------
https://en.wikipedia.org/wiki/Use_case
https://en.wikipedia.org/wiki/Sequence_diagram


https://en.wikipedia.org/wiki/List_of_Unified_Modeling_Language_tools


