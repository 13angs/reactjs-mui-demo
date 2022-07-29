import {useEffect, createContext, useMemo, useState, useCallback, useContext} from 'react';
import JsPDF from 'jspdf';
import styled from '@mui/material/styles/styled';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { MitrLight, MitrRegular } from './fonts/Mitr-normal';
import { PromptLight, PromptRegular, PromptMedium, PromptBold} from './fonts/Prompt-normal';
import img from './img/wn-logo.jpg';
import Barcode from 'react-barcode'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	padding: theme.spacing(0.5),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	border: '1px solid gray',
	boxShadow: 'none',
	fontSize: 8,
}));

const BoxStyle = styled(Box)(({ theme}) => ({
	display: 'flex',
	justifyContent: 'center',
	fontFamily: 'Prompt-Regular',
	alignItems: 'baseline',
	color: '#FFFFFF',
	'.winona-container': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		'.winona-icon':{
			width: 70,
			height: 70,
		},
		'.winona-content':{
			width: '80%',
			'.winona-title':{
				fontSize: '7px',
				fontFamily: 'Prompt-Light',
			},
			'.winona-header':{
				fontSize: '8px',
				fontFamily: 'Prompt-Regular',
			},
		},
	},
	'.vender-container': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		'.vender-content':{
			width: '90%',
			'.vender-title':{
				fontSize: '8px',
				fontFamily: 'Prompt-Light',
			},
			'.vender-invoice':{
				fontSize: '8px',
				fontFamily: 'Prompt-Light',
				letterSpacing: '1px',
			},
			'.vender-header':{
				marginTop: '8px',
				fontSize: '9px',
				fontFamily: 'Prompt-Medium',
			},
			'.vender-cod':{
				marginTop: '8px',
				fontSize: '9px',
				fontFamily: 'Prompt-Bold',
				letterSpacing: '1px',
			},
			'.vender-zipcode':{
				marginTop: '5px',
				fontFamily: 'Prompt-Light',
			},
		},
	},
}))
const GridStyle = styled(Grid)(({ theme}) => ({
	'&.MuiGrid-root .MuiGrid-item':{
		height: '223px',
		paddingLeft: '18px',
	}
}))

const initialContext = {
	item_per_page: 4, // number of items per page to display in the gridView
	orientation: 'landscape', // default orientation is landscape, portrait
	component_id: 'pdf-landscape', // component id default is pdf-landscape, pdf-portrait
};

const PdfConText = createContext(initialContext);

const usePdf = () => {
	const [state, setstate] = useState(initialContext);

	const setPdf = useCallback((callback) => {
		setstate(callback);
	}, [])

	return useMemo(() => {
		return {
			setstate,
			setPdf,
			item_per_page: state.item_per_page,
			orientation: state.orientation,
			component_id: state.component_id,
		}
	}, [
		state.item_per_page,
		state.orientation,
		state.component_id,
		setPdf
	])
}

const PdfProvider = (props) => {
	const { children } = props;
	const ctx = usePdf();
	return (
		<PdfConText.Provider value={ctx}>
			{children}
		</PdfConText.Provider>
	)
}

export default function MainPdfViewerComponent() {
	return (
		<PdfProvider>
			<PdfViewerComponent />
		</PdfProvider>
	)
}
// Create Document Component
function PdfViewerComponent() {
	const { orientation, component_id, item_per_page } = useContext(PdfConText);
	const pdf = new JsPDF({
		orientation: orientation,
		unit: "px"
		// format: [4, 2]
	});
	const width = pdf.internal.pageSize.getWidth();
	const height = pdf.internal.pageSize.getHeight();
	pdf.addFileToVFS('Mitr-Light-normal.ttf', MitrLight);
	pdf.addFont('Mitr-Light-normal.ttf', 'Mitr-Light', 'normal');

	pdf.addFileToVFS('Mitr-Regular-normal.ttf', MitrRegular);
	pdf.addFont('Mitr-Regular-normal.ttf', 'Mitr-Regular', 'normal');

	pdf.addFileToVFS('Prompt-Regular-normal.ttf', PromptRegular);
	pdf.addFont('Prompt-Regular-normal.ttf', 'Prompt-Regular', 'normal');

	pdf.addFileToVFS('Prompt-Medium-normal.ttf', PromptMedium);
	pdf.addFont('Prompt-Medium-normal.ttf', 'Prompt-Medium', 'normal');

	pdf.addFileToVFS('Prompt-Light-normal.ttf', PromptLight);
	pdf.addFont('Prompt-Light-normal.ttf', 'Prompt-Light', 'normal');

	pdf.addFileToVFS('Prompt-Bold-normal.ttf', PromptBold);
	pdf.addFont('Prompt-Bold-normal.ttf', 'Prompt-Bold', 'normal');

	// pdf.setFont('Mitr-Regular');
	// pdf.setFont('Prompt-Regular');
	const generatePDF = async () => {
		const data = await document.querySelector(`#${component_id}`);
		console.log(height);
		pdf.html(data, {
			callback: (doc => {
			  doc.save('test.pdf');
			}),
			x: 0,
			y: 0,
			width: width,
			height: height
		 });
	};

	const encodeBarcode = reactElement => {
		return reactElement;
	}

	const barcode = (val) => encodeBarcode(
		<Barcode value={val} renderer={"img"} width={1} height={20} margin={0} displayValue={false}/>
	);

	return (
		<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',}}>
			<Box id={component_id} 
				sx={{width: `${width}px`, fontFamily: 'Prompt-Regular',}}
			>
				<GridStyle container spacing={3} >
					{ORDER_LISTS.slice(0, item_per_page).map((val, i) => (
						<>
							<GridStyle key={i.toString()} item xs={6} sm={6} md={6} lg={6} xl={6} >
								<BoxStyle>
									<Box className='winona-container'>
										<img className='winona-icon' src={img} alt=''/>
										<Box className='winona-content'>
											<Typography className='winona-title'>ชื่อ​ที่​อยู่​ของ​ผู้​ส่ง</Typography>
											<Typography className='winona-header'>{DEFAULT_SHIPPING.company}</Typography>
											<Typography className='winona-title'>{DEFAULT_SHIPPING.address}</Typography>
											<Typography className='winona-title'>{`เบอร์โทรศัพร์ : ${DEFAULT_SHIPPING.phone}`}</Typography>
											<Stack sx={{mt:0.5}} direction="row" spacing={1/2}>
												{DEFAULT_SHIPPING.zipcode.split('').map((val, i) => (
													<Item key={i.toString()}>{val}</Item>
													))}
											</Stack>
											<Typography sx={{mt: 1}} className='winona-title'>(ก​รณีส่ง​สินค้า​ไม่สําเร็จ​ กรุณา​ส่ง​คืน​)</Typography>
											<Typography align='center' sx={{mt: 1}} className='winona-title'>จัดส่งเอง</Typography>
										</Box>
									</Box>
									<Box className='vender-container'>
										<Box className='vender-content'>
											<Box sx={{display: 'flex',}}>
												<Typography className='vender-title'>ใบสั่งซื้อเลขที่ : #</Typography>
												<Typography className='vender-invoice'>{val.invoice}</Typography>
											</Box>
											{barcode(val.invoice)}
											<Typography className='vender-header'>{val.name}</Typography>
											<Typography className='vender-title'>{val.product_code}</Typography>
											<Typography className='vender-title'>{val.address}</Typography>
											<Typography className='vender-title'>{`เบอร์โทรศัพร์ : ${val.phone}`}</Typography>
											<Stack sx={{mt:0.5}} direction="row" spacing={1/2}>
												{val.zipcode.split('').map((val1, i1) => (
													<Item key={i1.toString()}>{val1}</Item>
													))}
											</Stack>
											<Typography className='vender-cod'>{`COD: # ${val.phone}`}</Typography>
										</Box>
									</Box>
								</BoxStyle>
							</GridStyle>
						</>
					))}
				</GridStyle>
			</Box>
			<Button 
				onClick={generatePDF} 
				sx={{width: `${width}px`, backgroundColor: 'red'}}
			>
				Export PDF
			</Button>
		</Box>
	)
};

const DEFAULT_SHIPPING = {
    lable: 'https://www.example.com/',
    company: 'Winona Feminine Co., Ltd.',
    address: '288/65 หมู่​บ้า​น ​ธารา​ดี​ บิ​ซ ทาวน์​ หมู่ที่​ 5 ต.​ปาก​เกร็ด​ อ.​ปาก​เก​ร็ด นนทบุรี​ 11120 Thailand',
    phone: '0123456789',
    zipcode: '123456',
};

const ORDER_LISTS = [
    {
        id: 1,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00001',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
		zipcode: '123456',
    },
    {
        id: 2,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00002',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
		zipcode: '123456',
    },
    {
        id: 3,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00003',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
		zipcode: '123456',
    },
    {
        id: 4,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00004',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
    {
        id: 5,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00005',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
    {
        id: 6,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00006',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
    {
        id: 7,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00007',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
    {
        id: 8,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00008',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
    {
        id: 9,
        name: 'สุจิต​รา​ สุริยะ​พิทักษ์​กุล',
        product_code: 'L90',
        invoice: 'WN00008',
        address: 'รพ​.​สต.​บ้าน​วัง​อี​แอ่น​ 143 ม.8 ต.​พวา, อ.​แก่ง​หาง​แมว​, จันทบุรี 22160 Thailand',
        phone: '123456789',
        zipcode: '123456',
    },
]