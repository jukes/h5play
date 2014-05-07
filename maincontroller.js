app.controller("MainController", function($scope){
	$scope.understand = "I now understand how the scope works!";
	$scope.inputValue = "";
	$scope.selectedTrack = null;
	$scope.playingAudio = null;
	$scope.playList = [
	];

	$scope.addTrack=function(){
		console.log($scope.newTrack);
		if($scope.newTrack !== null){
			$scope.newTrack.index=$scope.playList.length;
			$scope.playList.push($scope.newTrack);
		}
	}

	$scope.trackSelected = function(fTrack){
		console.log('trackSelected: '+fTrack);
		var file = fTrack.files[0]; 
		console.log(file);		
		$scope.newTrack = {};
		$scope.newTrack.name = file.name;
		$scope.newTrack.playing = false;
		$scope.newTrack.src = URL.createObjectURL(file);
	}

	$scope.pause = function(){
		var currentAudio = $scope.playingAudio;
		if(currentAudio !== null){
			//currentAudio.pause();
			if(currentAudio.readyState===4){
				currentAudio.pause();
				//currentAudio.currentTime = 0;
			}
		}
	}

	//Stops
	$scope.stop = function(){
		var currentAudio = $scope.playingAudio;
		if(currentAudio !== null){
			//currentAudio.pause();
			if(currentAudio.readyState===4){
				console.log('currentAudio.readyState:'+currentAudio.readyState);
				currentAudio.removeEventListener('ended', $scope.onEnded);
				currentAudio.removeEventListener('canplay', $scope.onCanPlay);
				currentAudio.pause();
				currentAudio.currentTime = 0;
			}
		}
	}

	$scope.unpause = function(){
		var currentAudio = $scope.playingAudio;
		if(currentAudio !== null){
			//currentAudio.pause();
			if(currentAudio.readyState===4){
				currentAudio.play();
			}
		}
	}


	//Play the selected track on the playlist
	$scope.play=function(track){

		if($scope.playingAudio !== null){
			$scope.stop();
		}
		else{
			$scope.playingAudio = new Audio();
		}

		$scope.selectedTrack = track;

		$scope.playingAudio.src = track.src;
		$scope.playingAudio.addEventListener('canplay',$scope.onCanPlay);
		$scope.playingAudio.addEventListener('ended',$scope.onEnded);

		console.log('Play '+track.name+' index: '+track.index);		
		track.playing = true;
	}

	$scope.onCanPlay=function(e){
		console.log('canplay!');		
		$scope.playingAudio.play();		
	}

	$scope.onEnded=function(e){
		console.log('Ended!');
		$scope.play($scope.playList[$scope.selectedTrack.index+1]);
	}

});