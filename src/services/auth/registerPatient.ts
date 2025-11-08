/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';


export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const registerData = {
            password: formData.get("password"),
            patient: {
                name: formData.get('name'),
                address: formData.get('address'),
                email: formData.get('email'),
                contactNumber: formData.get('contact-number')
            }
        };

        const newFormData = new FormData(); // registerData ta amdr moto kore format korte  hoyeche,tai new formData kore arekta formData create korte hoyeche!

        newFormData.append('data', JSON.stringify(registerData));

        const res = await fetch("http://localhost:5000/api/user/create-patient", {
            method: "POST",
            body: newFormData
        }).then(res => res.json());

        return res;

    } catch (error) {
        console.log(error);
        return { error: "Registration failed!" }
    }
};