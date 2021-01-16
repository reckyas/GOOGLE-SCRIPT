function popForm() {

 

  var ss = SpreadsheetApp.getActive();
  var dapp = DriveApp;
  var mapel = getConfiguration(ss,'C2');

  // var sheet = ss.getActiveSheet();

  var sheet = ss.getSheetByName('soal'); 


  var numberRows = sheet.getDataRange().getNumRows() - 6;

 

  // Read the sheet data into 3 arrays.  Would be better practice (faster performance) to read all into 1 array and divide as needed).  

  var myQuestions = sheet.getRange(7,1,numberRows,1).getValues();

  var myAnswers = sheet.getRange(7,2,numberRows,1).getValues();

  var myGuesses = sheet.getRange(7,2,numberRows,5).getValues();

 

  // Shuffle the 5 choices horizontally.  This script only works with Questions in col A, correct Answer in col B, and false choices in col C thru F.

  var myShuffled = myGuesses.map(shuffleEachRow);

  Logger.log(myShuffled);

  Logger.log(myAnswers);

 

  // Create the form as a quiz.  The resulting form's "Quiz options" are different from a manually created quiz.  Be aware (and change manually if needed!
  
  // SETTING PENEMPATAN FILE SOAL
  var form = FormApp.create(getConfiguration(ss,'B2'));
  var formId = form.getId();
  var folderFormulir = dapp.getFolderById(getConfiguration(ss,'A2'));
  var fileSoal = dapp.getFileById(formId);
  fileSoal.moveTo(folderFormulir);
  form.setConfirmationMessage('Anda telah mengerjakan soal mapel ' + mapel);

  var point = getConfiguration(ss,'G2');
  form.setIsQuiz(Boolean(getConfiguration(ss,'E2')));
  form.setTitle(mapel);
  form.setRequireLogin(Boolean(getConfiguration(ss,'I2')));
  form.setDescription(getConfiguration(ss,'H2'));
  form.setPublishingSummary(Boolean(getConfiguration(ss,'J2')));
//  IKI BARANG CUKUP NAMA MAPELE
  form.addSectionHeaderItem().setTitle('MAPEL: ' + getConfiguration(ss, 'C2'));
  //  TRUS IKI SESUAI JURUSANE
//  form.addSectionHeaderItem().setTitle('KELAS/ KOMP.KEAHLIAN: XII/ TKJ');
//  TRUS IKI KELASE MENYESUAIKAN
//  form.addSectionHeaderItem().setTitle('HARI/ TANGGAL: JUMAT, 4 DESEMBER 2020');
  //  WAKTUNE FORMALITAS :V
//  form.addSectionHeaderItem().setTitle('WAKTU: 90 MENIT');
  form.addTextItem().setTitle('NAMA').setRequired(true);
//  Pilih kelas
  var kelasDiPakai = getKelas(ss,getConfiguration(ss,'D2'));
  
  
  var choises = [];
  for(var i = 0;i < kelasDiPakai.length;i++){
    choises.push(kelasDiPakai[i][0]);
  }
//  pilihanKelas.setChoices(choises).setRequired(true);
  form.addListItem().setChoiceValues(choises).setRequired(true).setTitle('KELAS');
  
  // Set link soal
  sheet.getRange(getConfiguration(ss,'K2')).setValue(form.shortenFormUrl(form.getPublishedUrl()));

  var newSS = SpreadsheetApp.create(mapel);
  var SSID = newSS.getId();

  var fileResponse = dapp.getFileById(SSID);
  var folderResponse = dapp.getFolderById(getConfiguration(ss,'M2'));
  fileResponse.moveTo(folderResponse);

  fileResponse.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  // Set link response
  sheet.getRange(getConfiguration(ss,'L2')).setValue('https://docs.google.com/spreadsheets/d/'+SSID+'/edit?usp=sharing');
  

  // Update the form's response destination.
  form.setDestination(FormApp.DestinationType.SPREADSHEET, newSS.getId());

  // Write out each multiple choice question to the form.

  for(var i=0;i<numberRows;i++){

    if (myShuffled[i][0] == myAnswers[i][0]) {

      var addItem = form.addMultipleChoiceItem();

      addItem.setTitle(myQuestions[i][0])

      .setPoints(point)

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

      .setPoints(point)

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

      .setPoints(point)

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

      .setPoints(point)

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

      .setPoints(point)

      .setChoices([

        addItem.createChoice(myShuffled[i][0]),

        addItem.createChoice(myShuffled[i][1]),

        addItem.createChoice(myShuffled[i][2]),

        addItem.createChoice(myShuffled[i][3]),

        addItem.createChoice(myShuffled[i][4],true)

      ]).setRequired(true);

    }

  }
  // var dapp = DriveApp;
  // var folderIter = dapp.getFoldersByName(namaFolder);
  // var folder = folderIter.next();
  // var fileSoal = dapp.getFilesByName(mapel);
  // while(fileSoal.hasNext()){
  //   var file = fileSoal.next();
  //   var mimeType = file.getMimeType();
  //   Logger.log(mimeType);
  //   if(mimeType == 'application/vnd.google-apps.spreadsheet') {
  //     file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
  //     sheet.getRange(2, 7).setValue('https://docs.google.com/spreadsheets/d/'+file.getId()+'/edit?usp=sharing');
  //   }
  //   file.moveTo(folder);
  // }

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

function getKelas(ss,range_kelas) {
  var sheetKELAS = ss.getSheetByName('KELAS');
  return sheetKELAS.getRange(range_kelas).getValues();
}

function getConfiguration(ss, configuartion_cell) {
  var sheetConfiguration = ss.getSheetByName('konfigurasi');
  return sheetConfiguration.getRange(configuartion_cell).getValue();
}





 














