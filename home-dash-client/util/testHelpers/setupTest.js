import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

process.env.NODE_ENV = 'development';
axios.defaults.adapter = httpAdapter;
Enzyme.configure({ adapter: new Adapter() });
axios.defaults.baseURL = 'http://localhost:8000';
