const path = require('path');
const fs = require('fs');
const csvWriter = require('csv-writer');

class ExportToCsv {

    constructor() {
      this.csvWriter = csvWriter;
      this.infoMessage = {
          success: {
              status: true, creation: true, message: 'Export to csv operation completed'
          },
          failure: {
              status: false, creation: false, message: 'Some internal error occurred'
          }
      };
      this.basePath = 'content.methods/export.to.csv/downloads';
    };

    // Get the path and header value ready for the CSV writer.
    _prepareCsvWriter(){
        this.downloadPath = this.basePath + '/' + this.options.fileName;
        this.writer = this.csvWriter.createObjectCsvWriter({
            path: path.resolve(process.cwd(), this.downloadPath),
            header: this.options.headerValue
        });
    };

    // Check and clear the files in the provided filepath with the same filename to avoid unexpected behavior.
    _checkAndClearDownloadPath(){
        return new Promise((resolve) => {
            fs.unlink(path.resolve(process.cwd(), this.downloadPath), (err) => {
                resolve(); // Resolving even though we get an error while deleting the file in the provided path.
            });
        });
    };

    // Convert to csv and then send it back to the controller.
    convertToCsv(options){
       this.options = options;
       return new Promise((resolve, reject) => {
           // Prepare the path and header values for the csv writer.
           this._prepareCsvWriter();
           // Before generate the csv file, delete files in the same name as filepath
           // in the provided filepath to avoid unexpected behavior.
           this._checkAndClearDownloadPath().catch((err) => {
               this.infoMessage.failure['errorInFileModule'] = err;
               reject(this.infoMessage.failure);
           });
           this.writer.writeRecords(this.options.cellValues).then(() => {
               this.infoMessage.success['successWriterInstance'] = this.writer;
               resolve(this.infoMessage.success);
           }).catch((error) => {
               this.infoMessage.failure['errorInCsv'] = error;
               this.infoMessage.failure['writerError'] = this.writer;
               reject(this.infoMessage.failure);
           });
       });
    };

}

module.exports = ExportToCsv;