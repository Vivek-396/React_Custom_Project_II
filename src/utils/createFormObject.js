function ObjCreate(id,name,username,email,phone,website){

    this.id=id;
    this.name=name;
    this.username=username;
    this.email=email;
    this.phone=phone;
    this.website=website;
    this.tasks=[];
  }
  export default ObjCreate;