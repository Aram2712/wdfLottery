import us from '../../Images/flags/us.png';
import aed from '../../Images/flags/ae.png';
import au from '../../Images/flags/au.png';
import bh from '../../Images/flags/bh.png';
import ca from '../../Images/flags/ca.png';
import ch from '../../Images/flags/ch.png';
import cn from '../../Images/flags/cn.png';
import europeanunion from '../../Images/flags/europeanunion.png';
import gb from '../../Images/flags/gb.png';
import hk from '../../Images/flags/hk.png';
import il from '../../Images/flags/il.png';
import ind from '../../Images/flags/in.png';
import kw from '../../Images/flags/kw.png';
import my from '../../Images/flags/my.png';
import om from '../../Images/flags/om.png';
import qa from '../../Images/flags/qa.png';
import sa from '../../Images/flags/sa.png';
import sg from '../../Images/flags/sg.png';

const currencyState = [
      {
            flag:ind,
            currency:"INR"
      },
      {
            flag:us,
            currency:"USD"
      },
      {
            flag:aed,
            currency:"AED"
      },
      {
            flag:europeanunion,
            currency:"EUR"
      },      

      {
            flag:gb,
            currency:"GBP"
      },
     
]

const currencyReducer = (state = currencyState, action) => {
      return state;
} 

export default currencyReducer