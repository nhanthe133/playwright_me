// performRecruitmentActions.js
export async function addRecord(page, recruitmentPage, ValidUser) {
    await recruitmentPage.recruitmentLink.click();
    await recruitmentPage.addButton.click();
    
    const formattedDate = ValidUser.dateOfApp.split("T")[0];
    await recruitmentPage.dateOfApp.clear();
    await recruitmentPage.vacancy.click();
    await recruitmentPage.vacancyName.click();
  
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      recruitmentPage.browseFile.click(),
    ]);
    await fileChooser.setFiles("C:/Users/VanThe/Desktop/dummy folder/correct.docx");
  
    await recruitmentPage.inputFull(
      ValidUser.firstName,
      ValidUser.lastName,
      ValidUser.email,
      ValidUser.middleName,
      ValidUser.contactNumber,
      ValidUser.keywords,
      formattedDate,
      ValidUser.notes
    );
  }
  