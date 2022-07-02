import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import routes from '../../routes/routes';
import styled from '@mui/material/styles/styled';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ProductCard = styled('div')(({theme}) => ({
  boxShadow: theme.shadows[2],
  textAlign: 'center',

  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(2),
    borderRadius: theme.spacing(3),
    '& div': {
      maxWidht: '100%',
      position: 'relative',

      '&:hover': {
        '& div': {
          display: 'block'
        }
      }
    },
    '& div img': {
      minWidth: '80%',
      maxWidth: '90%',
      height: 'auto',
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    '& div div': {
      position: 'absolute',
      left: '50%',
      bottom: '50%',
      // marginBottom: '-10%',
      marginLeft: '-15%',
      display: 'none'
    },

    '& div div svg': {
      color: theme.palette.common.white
    }
  }
}))

export default function ProductList() {
  const history = useHistory();

  const goToDetail = (item) => {

    // need to pass the parent route
    history.push(`${routes.product}/${item}`);

    // can't go back to the previous page
    // history.replace(`products/${item}`);
  };

  const copyToClipboard = (text)=> {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('success')
      }, () => {
        console.log('Failed')
      })
  }
 
  
  const download =(url, name) => {
    var link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
    
  
  // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
  //   console.log('done');
  // });

  const image = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`;

  return (
    <div>
      <Grid container spacing={2}>
        {[0, 1, 2, 3].map((item) => (
          <Grid item xl={3} key={item}>
            <ProductCard className='product-card'>
              <div>
                <img 
                  src={image}
                  alt=""
                  loading="lazy"
                  width={200}
                  height={182}
                  />

                  <div>
                    <IconButton onClick={() => download(image, 'reddot.jpg')} >
                      <DownloadIcon/>
                    </IconButton>
                    <IconButton onClick={() => copyToClipboard(image)}>
                      <ContentCopyIcon/>
                    </IconButton>
                  </div>
              </div>
            </ProductCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
