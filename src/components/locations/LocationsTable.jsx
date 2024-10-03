'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteLocation, updateLocation } from '@/app/api/api';
import QRCode from 'react-qr-code';
import ReactDOMServer from 'react-dom/server';

export default function LocationsTable({ locations: initialLocations, projectId }) {
  const [locations, setLocations] = useState(initialLocations);
  const router = useRouter();

  useEffect(() => {
    const sortedLocations = [...initialLocations].sort((a, b) => a.location_order - b.location_order);
    setLocations(sortedLocations);
  }, [initialLocations]);

  const handleMoveUp = async (index) => {
    if (index > 0) {
      const newLocations = [...locations];
      [newLocations[index - 1], newLocations[index]] = [newLocations[index], newLocations[index - 1]];
      await updateLocationOrders(newLocations);
      setLocations(newLocations);
    }
  };

  const handleMoveDown = async (index) => {
    if (index < locations.length - 1) {
      const newLocations = [...locations];
      [newLocations[index], newLocations[index + 1]] = [newLocations[index + 1], newLocations[index]];
      await updateLocationOrders(newLocations);
      setLocations(newLocations);
    }
  };

  const updateLocationOrders = async (newLocations) => {
    try {
      await Promise.all(newLocations.map((location, index) =>
          updateLocation(location.id, { ...location, location_order: index })
      ));
    } catch (error) {
      console.error('Error updating location orders:', error);
    }
  };

  async function handleDeleteLocation(id) {
    try {
      await deleteLocation(id);
      setLocations(locations.filter(location => location.id !== id));
    } catch (error) {
      console.error('Failed to delete location:', error);
    }
  }

  const generateQRValue = (location) => {
    return `${window.location.origin}/location/${location.id}`;
  };

  const printQRCode = (location) => {
    const printWindow = window.open('', '', 'height=400,width=400');
    printWindow.document.write(`
    <html>
      <head>
        <title>Print QR Code</title>
        <style>
          @page { margin: 0; }
          body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            flex-direction: column;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          svg { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <h2>${location.location_name}</h2>
        ${ReactDOMServer.renderToString(
        <QRCode value={generateQRValue(location)} size={256} />
    )}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const printAllQRCodes = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(`
    <html>
      <head>
        <title>Print All QR Codes</title>
        <style>
          @page { margin: 0; size: auto; }
          body { 
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .qr-container { 
            page-break-after: always; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            margin-bottom: 20px;
            height: calc(100vh - 40px);
            justify-content: center;
          }
          svg { max-width: 100%; height: auto; }
          .qr-container:last-child { page-break-after: avoid; }
        </style>
      </head>
      <body>
        ${locations.map(location => `
          <div class="qr-container">
            <h2>${location.location_name}</h2>
            ${ReactDOMServer.renderToString(
        <QRCode value={generateQRValue(location)} size={256} />
    )}
          </div>
        `).join('')}
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
      <>
        <Button onClick={printAllQRCodes} className="mb-4">Print QR Codes for All</Button>
        <Table className="w-full">
          <TableHeader>
            <TableRow className="justify-between">
              <TableHead className="w-1/6">Name</TableHead>
              <TableHead className="w-1/6">Trigger</TableHead>
              <TableHead className="w-1/6">Position</TableHead>
              <TableHead className="w-1/6">Score Points</TableHead>
              <TableHead className="w-2/6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((location, index) => (
                <TableRow key={location.id} className="justify-between">
                  <TableCell className="w-1/6">{location.location_name}</TableCell>
                  <TableCell className="w-1/6">{location.location_trigger}</TableCell>
                  <TableCell className="w-1/6">{location.location_position}</TableCell>
                  <TableCell className="w-1/6">{location.score_points}</TableCell>
                  <TableCell className="w-2/6">
                    <div className="flex space-x-2">
                      <Button onClick={() => handleMoveUp(index)} disabled={index === 0}>↑</Button>
                      <Button onClick={() => handleMoveDown(index)} disabled={index === locations.length - 1}>↓</Button>
                      <Button variant="outline" onClick={() => router.push(`/projects/${projectId}/locations/edit/${location.id}`)}>Edit</Button>
                      <Button variant="destructive" onClick={() => handleDeleteLocation(location.id)}>Delete</Button>
                      <Button variant="outline" onClick={() => printQRCode(location)}>Print QR Code</Button>
                    </div>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
  );
}