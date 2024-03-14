var server=require('express')
var app=server()
app.use(server.urlencoded())
const { Client } = require('pg')
const client = new Client({
  user: 'zkhnlyuj',
  host: 'peanut.db.elephantsql.com',
  database: 'zkhnlyuj',
  password: '0uAnAFE-OGiQrTFJdhxPjdbz38Sp2xyb',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.get('/lokasi',async function (req,respon,next){
 try {
	  
        client.query('SELECT * from lokasi',(err, res)=>{
		respon.status(200).json(res.rows)});
	
	//res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
})
app.get('/detil',async function (req,respon,next){
 try {
	  
        client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok where a.idkos=$1',[rek.body.idkos],(err, res)=>{
		respon.status(200).json(res.rows)});
	
	//res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
})
app.get('/cari',async function (rek,respon,next){
 try {
	 client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok',(err, res)=>{
	 respon.status(200).json(res.rows)});
	 if(rek.body.lokasi<=0 && rek.body.harga<=0){
		 client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok',(err, res)=>{
		 respon.status(200).json(res.rows)});
	 }
 else{
	 if(rek.body.lokasi>0 && rek.body.harga>0){
		 client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok where b.nama=$1 or a.harga=$2',[rek.body.lokasi,rek.body.harga],(err, res)=>{
		 respon.status(200).json(res.rows)});
		 }
	 else{
		 if(rek.body.lokasi>0){
			 client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok where b.nama=$1',[rek.body.lokasi],(err, res)=>{
		     respon.status(200).json(res.rows)});
		 }
		 else {
			 client.query('SELECT a.foto,a.nama,b.nama,a.alamat,a.deskripsi,a.fasilitas,a.harga from cari as a left join lokasi as b on a.lokasi=b.idlok where a.harga=$1',[rek.body.harga],(err, res)=>{
		     respon.status(200).json(res.rows)});
			 }
	 }
	 }
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
})
app.post('/kos',async function(req,res,next){
	try {
	
        client.query('insert into cari (foto, nama, lokasi, alamat, deskripsi, fasilitas, harga) values ($1,$2,$3,$4,$5,$6,$7)',[rek.body.foto,rek.body.nama,req.body.lokasi,req.body.alamat,req.body.deskripsi,req.body.fasilitas,req.body.harga],(err, res)=>{
		respon.status(200).json(res.rows)});
	
	//res.status(200).json(posts);
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
})
app.listen(4000)