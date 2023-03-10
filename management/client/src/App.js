import './App.css';
import Customer from './components/Customers';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress  from '@mui/material/CircularProgress';
import { Component } from 'react';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }
  stateRefresh= () => {
    this.setState({
      customers:'',
      completed: 0
    });
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err =>console.log(err));
    
  }

  componentDidMount(){
    this.timer = setInterval(this.progress, 20); // 0.02초마다 progress 함수 실행
    this.callApi()
      .then(res => this.setState({customers:res}))
      .catch(err =>console.log(err));
  }

  callApi = async ()=> {
    const response = await fetch('/api/customers');
    const body  = await response.json();
    return body;
  }
  progress = () => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
    return (
    <div>
      <Paper sx={{overflowX: "auto"}}>
        <Table stickyHeader sx={{maxWidth: '1080px', minWidth: '1080px'}}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c =>{
              return(<Customer key={c.id} id={c.id} iamge={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} stateRefresh={this.stateRefresh}/> );
            }): 
            <TableRow>
              <TableCell colSpan="6" align = "center">
                <CircularProgress value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
    </div>
    );
  }
}

export default App;
