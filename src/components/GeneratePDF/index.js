import React from 'react'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { renderToString } from 'react-dom/server'

const GeneratePdf = ({ formState, user }) => {
  const generatePdf = () => {
    const doc = new jsPDF('p', 'mm', 'a4')

    let rowTable = []
    let totalPrice = 0

    formState.inputs.forEach(input => {
      totalPrice += input.qte * input.price
      rowTable.push([
        input.title,
        input.price,
        input.qte,
        input.qte * input.price,
        '20%',
        (input.qte * input.price * 1.2).toFixed(2)
      ])
    })

    let logo = document.getElementById('imageInvoice').getAttribute('src')
    let dateInvoice = document
      .getElementById('inputDateInvoice')
      .getAttribute('value')

    doc.addImage(logo, 5, 5, 40, 40)

    doc.text(145, 15, 'Facture N° #: 123')
    doc.text(145, 20, 'Date : ')
    doc.text(162, 20, dateInvoice)

    doc.text(5, 70, user.societe)
    doc.text(5, 75, user.codePostal + '-' + user.ville)
    doc.text(5, 80, user.adresse)

    doc.text(145, 70, user.societe)
    doc.text(145, 75, user.firstName + '-' + user.lastName)
    doc.text(145, 80, user.email)

    // doc.autoTable({ html: '#tableautoTest', startY: 100 })

    doc.autoTable({
      head: [
        [
          'Produit',
          "Prix à l'unité",
          'Quantité',
          'Total HT',
          'TVA',
          'Total TTC'
        ]
      ],
      body: rowTable,
      startY: 100
    })

    doc.text(60, 130 + rowTable.length * 7, 'Total HT :' + totalPrice + '€')
    doc.text(100, 130 + rowTable.length * 7, 'TVA : 20%	')
    doc.text(
      130,
      130 + rowTable.length * 7,
      'Total TTC :' + (totalPrice * 1.2).toFixed(2) + '€'
    )

    // doc.text(split, 5, 75)
    doc.output('dataurlnewwindow')
  }

  return (
    <div className='button-container'>
      <button onClick={generatePdf}>Get PDF as text</button>
    </div>
  )
}

export default GeneratePdf
