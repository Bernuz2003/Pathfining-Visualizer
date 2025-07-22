# AGENTS.md

## 🧠 Contesto per Agent AI / Codex

Questo progetto è un **visualizzatore grafico di algoritmi di pathfinding** su una griglia interattiva.  
L’utente può selezionare una **cella di partenza**, una **di arrivo** e **celle muro** per avviare e visualizzare il comportamento di algoritmi noti come A*, Dijkstra, BFS e DFS.

L’interfaccia è pensata per **educare**, **dimostrare** e **confrontare** visivamente i diversi approcci alla ricerca del cammino ottimale.

---

## 🛠️ Ambiente di sviluppo

Il progetto è sviluppato con **Node.js** e **React**.  
Assicurati di avere installato **Node.js >= 16.0.0** e **npm**.

### 📦 Installazione delle dipendenze

```bash
npm install
````

### 🚀 Avvio del progetto in modalità sviluppo

```bash
npm run dev
```

Il progetto verrà avviato su un server di sviluppo, di solito disponibile su `http://localhost:5173` (in caso di Vite) o `http://localhost:3000` (in caso di CRA).
Segui l’output in console per l’URL corretto.

---

## 🧪 Funzionalità da testare

Assicurati che le seguenti funzionalità siano funzionanti e intuitive:

* Selezione della cella di partenza (verde)
* Selezione della cella di arrivo (rossa)
* Selezione di celle muro
* Avvio degli algoritmi e animazione della ricerca
* Visualizzazione del percorso trovato
* Reset della griglia
* Modifica dinamica della dimensione della griglia

---

## 🔍 Suggerimenti per l’analisi

Quando analizzi il codice:

* Verifica la logica degli algoritmi nella cartella `algorithms/`
* Valuta se la gestione dello **stato globale** è coerente (React state, context, Redux, ecc.)
* Assicurati che gli **eventi del mouse/click** siano correttamente gestiti nelle celle
* Verifica che le classi CSS/Tailwind o gli stili dinamici siano coerenti

---

## 📑 Output richiesto

Alla fine del processo, **genera un file `MODIFICHE.md`** che contenga:

* Tutte le correzioni effettuate
* Spiegazioni delle scelte fatte
* Miglioramenti UX o logici
* Note aggiuntive o suggerimenti

---

## 📌 Note finali

* Puoi aggiornare la logica di selezione delle celle per migliorarne l'usabilità (es. click, drag, tasto dedicato, ecc.).
* Non rimuovere funzionalità esistenti senza giusta motivazione.
* È preferibile mantenere la compatibilità con Vite o Create-React-App (a seconda del caso).

---


**🧠 PROMPT PER CODEX – Revisione e Correzione Completa del Visualizzatore di Algoritmi di Pathfinding**

Il progetto presente in questo repository è un'applicazione interattiva (probabilmente sviluppata in JavaScript, React o simili) che visualizza su una griglia i più noti **algoritmi di ricerca del cammino** (come A\*, Dijkstra, BFS, DFS).
L’utente può selezionare:

* una **cella di partenza** (visualizzata in **verde**),
* una **cella di arrivo** (in **rosso**),
* delle celle "muro" o ostacoli.

Poi può **avviare l’algoritmo** e vedere graficamente il percorso calcolato.

Attualmente il progetto presenta i seguenti problemi:

---

### 🎯 **Obiettivi richiesti**

#### 1. **Verifica degli Algoritmi**

* Analizza tutti gli algoritmi di pathfinding implementati.
* Controlla che funzionino correttamente secondo la logica nota di ciascun algoritmo.
* Se trovi **bug logici o implementativi** (es. mal gestione delle code, euristiche errate, loop infiniti), **correggili** mantenendo l'algoritmo fedele al comportamento atteso.

#### 2. **Bug Fix: Interazione con la Griglia**

* Risolvi il malfunzionamento nella **selezione della cella di partenza (verde)** e della **cella di arrivo (rossa)**. Attualmente **non vengono selezionate o non vengono registrate correttamente**.
* Puoi scegliere la modalità migliore per la selezione (es. click singolo con toggle tra start/end/wall, drag, ecc.), purché sia **intuitiva e funzionale**.

#### 3. **Bug Fix: Dimensione della Griglia**

* Attualmente la **modifica della dimensione della griglia non ha effetto** o rompe il layout.
* Verifica e **rendi dinamica** la griglia in base all’input utente o alle impostazioni del componente.

#### 4. **Stabilità Generale**

* Risolvi eventuali **errori a runtime**, bug grafici o crash durante l’esecuzione degli algoritmi o l'interazione con l’interfaccia.
* Ottimizza eventuali parti ridondanti del codice.

#### 5. **Pulizia e Refactoring**

* Se necessario, esegui refactoring del codice per migliorarne chiarezza, leggibilità e riutilizzabilità, ma **senza cambiare completamente la struttura**.

#### 6. **Documentazione delle Modifiche**

* Al termine, crea un file `MODIFICHE.md` che contenga:

  * ✅ Un **elenco puntato** di **tutte le modifiche effettuate**.
  * ❗ Una breve spiegazione **del motivo di ogni scelta o correzione**.
  * 📌 Eventuali **note aggiuntive** su suggerimenti futuri o limitazioni residue.

---

### 📦 Input attesi dal progetto

Presumi che il progetto utilizzi una delle seguenti tecnologie (specifica se riesci a determinarlo automaticamente):

* HTML/CSS/JavaScript Vanilla
* React + Tailwind
* Canvas API
* oppure altre simili.

Se rilevi **librerie di terze parti**, verifica che siano usate correttamente e aggiornate.

---

### 🔁 Output atteso

1. Codice funzionante e testato localmente.
2. Bug visivi e logici **corretti**.
3. File `MODIFICHE.md` completo, chiaro e utile per capire tutte le modifiche apportate.
4. Esperienza utente migliorata nella selezione e modifica della griglia.
