import React, { Component } from 'react'
import { connect } from 'react-redux'

class FormReact extends Component {

  state = {
    values: {
      maSV: '',
      hoTen: '',
      sdt: '',
      email: ''
    },
    errors: {
      maSV: '',
      hoTen: '',
      sdt: '',
      email: ''
    }
  }

  inputChange = (event) => {
    let { name, value } = event.target;
    let newValue = { ...this.state.values, [name]: value }

    let newError = { ...this.state.errors }
    let errorsMsg = ''
    if (value.trim() == '') {
      errorsMsg = name + '  không được để trống !'
    }


    let typeEmail = event.target.getAttribute('typeinput')

    if (typeEmail == 'email') {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!regex.test(value)) {
        errorsMsg = 'Email không đúng định dạng !'
      }
    }

    let typeSDT = event.target.getAttribute('typeinput')
    if (typeSDT == 'sdt') {
      let regex = /^[0-9]+$/
      if (!regex.test(value)) {
        errorsMsg = 'Số điện thoại phải là số !'
      }
    }


    newError[name] = errorsMsg

    this.setState({
      values: newValue,
      errors: newError
    })
  }

  hanldeSubmit = (event) => {
    event.preventDefault();
    let isValid = true;
    for (const key in this.state.errors) {
      if (this.state.errors[key] !== '') {
        isValid = false
        break
      }
    }

    for (const key in this.state.values) {
      if (this.state.values[key] === '') {
        isValid = false
        break
      }
    }

    if (!isValid) {
      alert('Dữ liệu không hợp lệ');
      return;
    }
    let action = {
      type: 'THEM_SV',
      sinhVien: this.state.values
    }
    this.props.dispatch(action)
  }
  // static getDerivedStateFromProps(newProps, currentState) {
  //   if (newProps.sinhVienChiTiet.maSV !== currentState.values.maSV) {
  //     return {
  //       ...currentState,
  //       values: newProps.sinhVienChiTiet
  //     }
  //   }
  //   return currentState;
  // }
  componentWillReceiveProps(newProps){
    this.setState({
      values: newProps.sinhVienChiTiet
    })
  }



  render() {
    let { maSV, hoTen, sdt, email } = this.state.values
    return (
      <div>
        <h1 className='bg-dark text-light px-3 py-2'>Thông tin sinh viên</h1>
        <form onSubmit={(event) => {
          this.hanldeSubmit(event)
        }}>
          <div className='row'>
            <div className="col-6 mb-3">
              <span>Mã SV</span>
              <input onChange={(event) => {
                this.inputChange(event)
              }} value={maSV} type="text" name="maSV" id='maSV' className='form-control' />
              <p  className='text-danger'>{this.state.errors.maSV}</p>
            </div>
            <div className="col-6 mb-3">
              <span>Họ Tên</span>
              <input onChange={(event) => {
                this.inputChange(event)
              }} value={hoTen} type="text" name="hoTen" className='form-control' />
              <p className='text-danger'>{this.state.errors.hoTen}</p>
            </div>
            <div className="col-6 mb-3">
              <span>Số điện thoại</span>
              <input onChange={(event) => {
                this.inputChange(event)
              }} value={sdt} typeinput="sdt" type="text" name="sdt" className='form-control' />
              <p className='text-danger'>{this.state.errors.sdt}</p>
            </div>
            <div className="col-6 mb-3">
              <span>Email</span>
              <input onChange={(event) => {
                this.inputChange(event)
              }} value={email} typeinput="email" type="text" name="email" className='form-control' />
              <p className='text-danger'>{this.state.errors.email}</p>
            </div>
            <div className='col-12 text-right py-4'>
              <button className='btn btn-success mr-3'>Thêm sinh viên</button>
              <button onClick={() => {
                let action = {
                  type: 'CAP_NHAT_SV',
                  sinhVienCN: this.state.values
                }
                this.props.dispatch(action)
              }} type='button' className='btn btn-info'>Cập nhật</button>
            </div>
          </div>

        </form>
        <div className='row'>
          <div  style={{ width: "80%" }} className='col-10 text-center'>
            <input onChange={(event)=>{
              let action = {
                type:'SEARCH',
                timSV : event.target.value
              }
              this.props.dispatch(action)
            }} type="text" className='form-control' />
          </div>
          <div className='col-2'>
            <button onClick={() =>{
              let action ={
                type:'HANDLE',
                value:this.props.inputSearch
              }
              this.props.dispatch(action)
            }} className='btn btn-primary'>Search</button>
          </div>
        </div>



      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    sinhVienChiTiet: rootReducer.QLSVReducer.sinhVienChiTiet,
    mangSV: rootReducer.QLSVReducer.mangSV,
    inputSearch: rootReducer.QLSVReducer.inputSearch
  }
}

export default connect(mapStateToProps)(FormSV)
