document.getElementById('mainForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('siteName').value;	
	var siteUrl = document.getElementById('siteUrl').value;

	//field is requaried
	if(!siteName || !siteUrl){
		alert('Please fill the form');
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	}	

	//local storage
	 if(localStorage.getItem('bookmarks') === null){
	 	//init array
	 	var bookmarks = [];
	 	//add to array
	 	bookmarks.push(bookmark);
	 	//set to local storage
	 	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	 } else {
	 	//get bookmarks from localStorage
	 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	 	//add bookmark to array
	 	bookmarks.push(bookmark);
	 	// Re-st to local storage
	 	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	 }

	//re-fetch bookmarks
	fetchBookmarks();

	//Prevent from submitting
	e.preventDefault();
};

//delete bookmark
function deleteBookmark(bookmarkUrl){
	
	//get bookmarks from localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//loop through bookmarks
	for (var i = 0; i<bookmarks.length; i++){
		if(bookmarks[i].url == bookmarkUrl){
			//remove from array
			bookmarks.splice(i, 1)
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//re-fetch bookmarks
	fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks (){
 	//get bookmarks from localStorage
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 	//get output id
 	var bookmarksResults = document.getElementById('bookmarksResults');

 	//build output
 	bookmarksResults.innerHTML = '';

 	for(var i = 0; i < bookmarks.length; i++ ){
 		var bookmarkName = bookmarks[i].name;
 		var bookmarkUrl = bookmarks[i].url;


 		bookmarksResults.innerHTML += 
 		'<div class="card">'+
	 		'<div class="card-body">'+
				'<h3 class="card-title">'+bookmarkName+'</h3>'+
				' <a class="btn btn-primary" target="_blank" href="'+bookmarkUrl+'">Visit it</a>'+
				' <a onclick="deleteBookmark(\''+bookmarkUrl+'\')" class="btn btn-danger" href="#">Delete</a>'+
			'</div>'+
		'</div>';
 	}
}