import { useState } from 'react';
import { Modal } from '@mui/joy';
import Image from 'next/image';

interface PrintSampleViewerProps {
	color: string;
}

export default function PrintSampleViewer({ color }: PrintSampleViewerProps) {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState('');

	const handleImageClick = (imagePath: string) => {
		setSelectedImage(imagePath);
		setOpen(true);
	};

	// Import images dynamically based on color
	const getImagePath = (filename: string) => `/ship/${filename}`;
	const sampleImages = [`${color}01.jpeg`, `${color}02.jpeg`];

	return (
		<div style={{ marginTop: '16px' }}>
			<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
				{sampleImages.map((img, index) => (
					<div
						key={index}
						style={{
							position: 'relative',
							width: '100px',
							height: '100px',
							cursor: 'pointer'
						}}
					>
						<Image
							src={getImagePath(img)}
							alt={`Sample ${color} print ${index + 1}`}
							fill
							style={{
								objectFit: 'cover',
								borderRadius: '8px'
							}}
							onClick={() => handleImageClick(img)}
						/>
					</div>
				))}
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<div style={{
					position: 'relative',
					height: '90vh',
					aspectRatio: '4/3',
				}}>
					<Image
						src={selectedImage ? getImagePath(selectedImage) : ''}
						alt={`${color} print sample enlarged view`}
						fill
						style={{ objectFit: 'contain' }}
					/>
				</div>
			</Modal>
		</div>
	);
}
