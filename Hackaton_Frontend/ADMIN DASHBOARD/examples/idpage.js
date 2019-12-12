      
    function viewIdentity(id) {
      fetch(`http://localhost:8080/api/v1/identity/${id}`, {
        method: 'GET',
        headers: {
          'token': token,
          'Accept': 'application/json, text/plain. */*',
          'content-type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            location.href='../examples/IDcardform.html'

            let applicantName = document.getElementById('applicantName').value = data.data.name;
            let nextOfKinName = document.getElementById('name_nextOfKin').value = data.data.name_nextofkin;
            let nextOfKinAddress = document.getElementById('address_nextOfKin').value = data.data.address_nextofkin;
            let idNumber = document.getElementById('idNumber').value = data.data.idnumber;
            let unit = document.getElementById('unit').value = data.data.unit;
            let branch = document.getElementById('branch').value = data.data.branch;
            console.log(branch, 'kkkkkkkkkkk')

            let identityImg = document.getElementById('identityImg');
            identityImg.setAttribute('src',`../../../server/images/${data.data.passport}`);
            let signatureImg = document.getElementById('signatureImg');
            signatureImg.setAttribute('src', `../../../server/images/${data.data.signature}`);
            

          } else {
            return false;
          }
        })
    };