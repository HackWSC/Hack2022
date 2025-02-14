angular.module('reg')
    .controller('TeamForumCtrl',[
        '$scope',
        '$state',
        '$stateParams',
        'UserService',
        'ForumService',
        function($scope, $state, $stateParams, UserService, ForumService){
            // declarations
            const FORUM_TYPE = "team";
            $scope.unreadMsgTeam = 0;
            $scope.searchText = "";
            $scope.searchUser = "";
            $scope.myForum = new FormData();
            $scope.forum = $scope.getAllForumsByType(FORUM_TYPE)[0];

            // get all chat members to show.
            function setMembers() {
                UserService.getMembersByTeam($scope.myForum.team)
                    .then(response => {
                        $scope.allUsers = response.data;
                    }, response => {
                        console.log(response);
                    });
            }

            // set specific forum - general
            function setForum(){
                $scope.updateCurrentForum($scope.forum._id, function (){
                    $scope.myForum = $scope.currentForum;
                    setMembers();
                    if ($scope.myForum.lastMessage - $scope.oldForums.get($scope.myForum._id).lastMessage !== 0)
                        $scope.updateUserForums($scope.myForum._id, $scope.myForum.lastMessage);
                });
            }

            // send message
            $scope.send = function (){
                $scope.sendMessage($scope);
            };

            setForum();
        }]);