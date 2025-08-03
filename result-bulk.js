
// CSV Button

function exportTableToCsv(filename) {
  const table = document.getElementById("dataTable");
  const rows = table.querySelectorAll("tr");

  let csv = [];

  // Construct CSV header row
  let headerRow = [];
  for (let i = 0; i < rows[0].cells.length; i++) {
    let cell = rows[0].cells[i];
    headerRow.push(cell.textContent.trim());
  }
  csv.push(headerRow.join(","));

  // Construct CSV data rows
  for (let i = 1; i < rows.length; i++) {
    let dataRow = [];
    let cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      let cell = cells[j];
      dataRow.push(cell.textContent.trim());
    }
    csv.push(dataRow.join(","));
  }

  // Create CSV file and download
  const csvContent = csv.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert("Your browser does not support downloading files.");
  }
}

// PDF Button
function exportTableToPdf() {
  const table = document.getElementById("dataTable");
  const rows = table.querySelectorAll("tr");

  // Initialize jsPDF with landscape orientation
  const doc = new jsPDF({
    orientation: "landscape", // Set orientation to landscape
    unit: "mm", // Unit of measurement (millimeters)
    format: "a4", // Paper format (A4)
  });

  // Set properties for PDF
  const margins = { top: 10, left: 10, bottom: 10, right: 10 };
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;

  // Start position for PDF content
  let yPos = margins.top;

  // Add table headers
  let header = [];
  const headerRows = table.rows[0].cells;
  for (let i = 0; i < headerRows.length; i++) {
    header.push(headerRows[i].textContent.trim());
  }

  // Add table rows
  let dataRow = [];
  for (let i = 1; i < rows.length; i++) {
    let row = [];
    const cells = rows[i].querySelectorAll("td");
    for (let j = 0; j < cells.length; j++) {
      row.push(cells[j].textContent.trim());
    }
    dataRow.push(row);
  }

  // Add table to PDF using autoTable plugin
  doc.autoTable({
    startY: yPos,
    head: [header],
    body: dataRow,
    margin: margins,
    pageBreak: "auto", // Automatically handle page breaks
    theme: "striped", // Optional: adds alternating row colors
  });

  // Save PDF
  doc.save("table.pdf");
}
