import { useSelector } from 'react-redux';
import { CartIcon } from '../icons';

const Navbar = () => {
	const { amount } = useSelector((state) => state.cart);

	// useSelector((store) => {
	// 	console.log(store);
	// });

	return (
		<nav className='nav-bar'>
			<div className='nav-center'>
				<h3>redux toolkit</h3>
				<div className='nav-container'>
					<CartIcon />
					<div className='amount-container'>
						<p className='total-amount'>{amount}</p>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
