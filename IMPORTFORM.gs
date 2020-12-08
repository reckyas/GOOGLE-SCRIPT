function popForm() {

 

  var ss = SpreadsheetApp.getActive();

  // var sheet = ss.getActiveSheet();

  var sheet = ss.getSheetByName('Sheet1');
  var sheetKELAS = ss.getSheetByName('KELAS'); 
  var kelasX = sheetKELAS.getRange("A2:A16").getValues();
  var kelasXI = sheetKELAS.getRange("B2:B16").getValues();
  var kelasXII = sheetKELAS.getRange("C2:C16").getValues();
  var kelasXTKR = sheetKELAS.getRange("A2:A7").getValues();
  var kelasXTKJ = sheetKELAS.getRange("A8:A12").getValues();
  var kelasXTB = sheetKELAS.getRange("A13:A14").getValues();
  var kelasXTBSM = sheetKELAS.getRange("A15:A16").getValues();
  var kelasXITKR = sheetKELAS.getRange("B2:B7").getValues();
  var kelasXITKJ = sheetKELAS.getRange("B8:B12").getValues();
  var kelasXITB = sheetKELAS.getRange("B13:B14").getValues();
  var kelasXITBSM = sheetKELAS.getRange("B15:B16").getValues();
  var kelasXIITKR = sheetKELAS.getRange("C2:C7").getValues();
  var kelasXIITKJ = sheetKELAS.getRange("C8:C12").getValues();
  var kelasXIITB = sheetKELAS.getRange("C13:C14").getValues();
  var kelasXIITBSM = sheetKELAS.getRange("C15:C16").getValues();

  var numberRows = sheet.getDataRange().getNumRows();

 

  // Read the sheet data into 3 arrays.  Would be better practice (faster performance) to read all into 1 array and divide as needed).  

  var myQuestions = sheet.getRange(1,1,numberRows,1).getValues();

  var myAnswers = sheet.getRange(1,2,numberRows,1).getValues();

  var myGuesses = sheet.getRange(1,2,numberRows,5).getValues();

 

  // Shuffle the 5 choices horizontally.  This script only works with Questions in col A, correct Answer in col B, and false choices in col C thru F.

  var myShuffled = myGuesses.map(shuffleEachRow);

  Logger.log(myShuffled);

  Logger.log(myAnswers);

 

  // Create the form as a quiz.  The resulting form's "Quiz options" are different from a manually created quiz.  Be aware (and change manually if needed!
//  IKI HEADER GAK SAH DI UBAH
  var header = 'UAS 1 SMKN 1 BADEGAN';
//  SING DI UBAH MAPEL NGISOR IKI
  var mapel = 'TLJ-XII-TKJ';
  var namaFolder = 'UAS 1 2020-2021';
  var form = FormApp.create(mapel);
  form.setIsQuiz(true);
  form.setTitle(header);
  form.setRequireLogin(false);
  form.setDescription('TAHUN PELAJARAN 2020/2021');
//  IKI BARANG CUKUP NAMA MAPELE
  form.addSectionHeaderItem().setTitle('MAPEL: T L J');
  //  TRUS IKI SESUAI JURUSANE
  form.addSectionHeaderItem().setTitle('KELAS/ KOMP.KEAHLIAN: XII/ TKJ');
//  TRUS IKI KELASE MENYESUAIKAN
  form.addSectionHeaderItem().setTitle('HARI/ TANGGAL: JUMAT, 4 DESEMBER 2020');
  //  WAKTUNE FORMALITAS :V
  form.addSectionHeaderItem().setTitle('WAKTU: 90 MENIT');
  form.addTextItem().setTitle('NAMA').setRequired(true);
//  Pilih kelas
  var kelasDiPakai = kelasXIITKJ;
  
  
  var choises = [];
  for(var i = 0;i < kelasDiPakai.length;i++){
    choises.push(kelasDiPakai[i][0]);
  }
//  pilihanKelas.setChoices(choises).setRequired(true);
  form.addListItem().setChoiceValues(choises).setRequired(true).setTitle('KELAS');
  
  sheet.getRange(1, 7).setValue(form.shortenFormUrl(form.getPublishedUrl()));
 
  var formId = form.getId();
  var newSS = SpreadsheetApp.create(mapel);

  // Update the form's response destination.
  form.setDestination(FormApp.DestinationType.SPREADSHEET, newSS.getId());

  // Write out each multiple choice question to the form.

  for(var i=0;i<numberRows;i++){

    if (myShuffled[i][0] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(4)

      .setChoices([

        addItem.createChoice(myShuffled[i][0],true),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]).setRequired(true);

    }

    else if (myShuffled[i][1] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(4)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1],true),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]).setRequired(true);

    }

    else if (myShuffled[i][2] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(4)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2],true),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4])

      ]).setRequired(true);

    }

    else if (myShuffled[i][3] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(4)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3],true),

        addItem.createChoice(myShuffled[i][4])

      ]).setRequired(true);

    }

    else {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(4)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4],true)

      ]).setRequired(true);

    }

  }
  var dapp = DriveApp;
  var folderIter = dapp.getFoldersByName(namaFolder);
  var folder = folderIter.next();
  var fileSoal = dapp.getFilesByName(mapel);
  while(fileSoal.hasNext()){
    var file = fileSoal.next();
    var mimeType = file.getMimeType();
    Logger.log(mimeType);
    if(mimeType == 'application/vnd.google-apps.spreadsheet') {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
      sheet.getRange(2, 7).setValue('https://docs.google.com/spreadsheets/d/'+file.getId()+'/edit?usp=sharing');
    }
    file.moveTo(folder);
  }

}


// This function, called by popForm, shuffles the 5 choices.

function shuffleEachRow(array) {

  var i, j, temp;

  for (i = array.length - 1; i > 0; i--) {

    j = Math.floor(Math.random() * (i + 1));

    temp = array[i];

    array[i] = array[j];

    array[j] = temp;

  }

  return array;

}
