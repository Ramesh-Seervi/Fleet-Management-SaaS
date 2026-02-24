import React, { useState } from 'react';
import {
    Download,
    FileText,
    FileJson,
    FileCode,
    Image as ImageIcon,
    Printer,
    Check,
    ChevronDown
} from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const cn = (...classes) => classes.filter(Boolean).join(' ');

const ExportButton = ({ data, filename = 'export', columns, tableId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [exporting, setExporting] = useState(null);

    const exportToXLSX = () => {
        setExporting('xlsx');
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        setExporting(null);
        setIsOpen(false);
    };

    const exportToPDF = () => {
        setExporting('pdf');
        const doc = new jsPDF();

        // Auto-detect headers from columns if provided, otherwise keys
        const headers = columns ? columns.map(col => col.header) : Object.keys(data[0] || {});
        const tableData = data.map(row =>
            columns ? columns.map(col => row[col.key]) : Object.values(row)
        );

        doc.autoTable({
            head: [headers],
            body: tableData,
            theme: 'striped',
            headStyles: { fillStyle: '#0ea5e9' }
        });

        doc.save(`${filename}.pdf`);
        setExporting(null);
        setIsOpen(false);
    };

    const exportToJSON = () => {
        setExporting('json');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.json`;
        link.click();
        setExporting(null);
        setIsOpen(false);
    };

    const exportToDOC = () => {
        setExporting('doc');
        let content = `<html><body><table border="1"><tr>${Object.keys(data[0] || {}).map(k => `<th>${k}</th>`).join('')}</tr>`;
        data.forEach(row => {
            content += `<tr>${Object.values(row).map(v => `<td>${v}</td>`).join('')}</tr>`;
        });
        content += '</table></body></html>';

        const blob = new Blob([content], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.doc`;
        link.click();
        setExporting(null);
        setIsOpen(false);
    };

    const exportToImage = async () => {
        if (!tableId) return;
        setExporting('image');
        const element = document.getElementById(tableId);
        const canvas = await html2canvas(element);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.png`;
        link.click();
        setExporting(null);
        setIsOpen(false);
    };

    const handlePrint = () => {
        window.print();
        setIsOpen(false);
    };

    const options = [
        { label: 'Excel (XLSX)', icon: FileCode, action: exportToXLSX, id: 'xlsx' },
        { label: 'PDF Document', icon: FileText, action: exportToPDF, id: 'pdf' },
        { label: 'Word (DOC)', icon: FileText, action: exportToDOC, id: 'doc' },
        { label: 'JSON Format', icon: FileJson, action: exportToJSON, id: 'json' },
        { label: 'PNG Image', icon: ImageIcon, action: exportToImage, id: 'image', disabled: !tableId },
        { label: 'Print View', icon: Printer, action: handlePrint, id: 'print' },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
            >
                <Download size={18} />
                Export
                <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={option.action}
                                disabled={option.disabled || !!exporting}
                                className={cn(
                                    "flex items-center items-center gap-3 w-full px-4 py-2.5 text-sm font-bold transition-all",
                                    option.disabled
                                        ? "text-slate-300 cursor-not-allowed"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-brand-600"
                                )}
                            >
                                <option.icon size={18} />
                                {option.label}
                                {exporting === option.id && (
                                    <div className="ml-auto w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ExportButton;
