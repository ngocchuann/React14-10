const initialState = {
    mangSV: [
        { maSV: '1', hoTen: 'Nguyễn Văn A', sdt: '0938111111', email: 'nguyenvana@gmail.com' },
        { maSV: '2', hoTen: 'Nguyễn Văn B', sdt: '0938222322', email: 'nguyenvanb@gmail.com' }
    ],
    sinhVienChiTiet: {
        maSV: '',
        hoTen: '',
        sdt: '',
        email: ''
    },
    search: [],
    inputSearch: ""
}



export const QLSVReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'THEM_SV':
            state.mangSV = [...state.mangSV, action.sinhVien]
            return { ...state }
        case 'XOA_SV':
            state.mangSV = state.mangSV.filter((sv) => {
                return sv.maSV !== action.maXoa
            })
            return { ...state }
        case 'XEM_CT':
            state.sinhVienChiTiet = action.sinhVienCT
            document.getElementById('maSV').setAttribute("disabled", true)
            return { ...state }
        case 'CAP_NHAT_SV':
            let svFindIndex = state.mangSV.findIndex((sv) => {
                return sv.maSV == action.sinhVienCN.maSV
            })
            if (svFindIndex !== -1) {
                state.mangSV[svFindIndex] = action.sinhVienCN
            }
            state.mangSV = [...state.mangSV]

            return { ...state }
        case 'SEARCH':
            state.inputSearch = action.timSV.toLowerCase()
            return { ...state }
        case 'HANDLE':
            let mangTK = state.mangSV.filter((sv) => {
                return sv.hoTen.toLowerCase().includes((state.inputSearch))
            })
            state.search = mangTK
            return { ...state }

        default:
            return state
    }
}
