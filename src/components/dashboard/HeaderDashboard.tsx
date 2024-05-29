'use client';

import { Button, Container, Heading } from '@radix-ui/themes';
import axios from 'axios';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import https from 'https'
import { metadata } from '../../app/layout';



function HeaderDashboardPage() {

	const imageInput = useRef<HTMLInputElement>(null);
	const excelInput = useRef<HTMLInputElement>(null);
	const [image, setImage] = useState<any | null>(null);
	const [excel, setExcel] = useState<any | null>(null);

	const agent = new https.Agent({
		rejectUnauthorized: false
	  });

	const handleImageUploadClick = () => {
		if (imageInput.current) {
			imageInput.current.click();
		}
	};

	const handleExcelUploadClick = () => {
		if (excelInput.current) {
			excelInput.current.click();
		}
	};

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImage(reader.result);
		};
	
	};

	const handleExcelChange = (event: any) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = () => {
			const fileData = new Uint8Array(reader.result as ArrayBuffer);
			const workbook = XLSX.read(fileData, { type: 'array' });
			const sheetName = workbook.SheetNames[0];
			const sheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(sheet);

			const extractData = jsonData.map((data: any) => {
				return { ci: data['CI'], monto: data['MONTO']}
			})
			setExcel(extractData);
		};
	};

	const handleSubmitForm = async  (event: any) => {
    event.preventDefault();
    if (!image || !excel) {
        toast.error('Debes subir tanto la imagen como el archivo Excel');
        return;
    }
	
	try {
		const res = await axios.post('https://billetera-dev.z1.mastarjeta.net/api/desembolso/pediboss/', {image, excel}, { httpsAgent: agent, 
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		});
		console.log('res', res);
		toast.success('Archivos subidos correctamente');
	} catch (error: any) {
		console.log(error);
		toast.error(`Error al subir los archivos: ${error.message}`);
	}
  }

	return (
		<Container>
			<div className="flex justify-between py-4 items-center mb-4s">
				<Heading>Sube tus archivos</Heading>
					<form onSubmit={handleSubmitForm}>
				    <div className="flex gap-4">
						<Button onClick={handleImageUploadClick} className={clsx(
							'cursor-pointer',
							image && 'bg-green-400'
						)}>
							{image ? 'Imagen Cargada' : 'Subir Imagen'}
						</Button>
						<Button onClick={handleExcelUploadClick} className={clsx(
							'cursor-pointer',
							excel && 'bg-green-400'
						)}>
							{excel ? 'Excel Cargado' : 'Subir Excel'}
						</Button>
						<input
							type="file"
							accept="image/*"
							ref={imageInput}
							style={{ display: 'none' }}
							onChange={handleImageChange}
						/>
						<input
							type="file"
							accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
							ref={excelInput}
							style={{ display: 'none' }}
							onChange={handleExcelChange}
						/>
            <Button type='submit' className="cursor-pointer bg-green-400 ml-10">
              Procesar Archivos
            </Button>
				</div>
					</form>
			</div>
		</Container>
	);
}

export default HeaderDashboardPage;
